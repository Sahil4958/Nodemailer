const nodemailer = require('nodemailer');
const Mailgen  = require('mailgen')
const  {EMAIL , PASSWORD} = require('../env')
// require('dotenv').config();
//send mail from testing account
const signUp = async (req,res) =>{
        /** testing account */

        let testAccount = await nodemailer.createTestAccount();

        //create reusable transporter object using the default  SMTP  transport

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false , //true for 465, false for other ports
            auth:{
                user : testAccount.user, // generated ethereal user
                pass : testAccount.pass, //generated ethreal password
            }
        });

        let message = {
            from: '"steven smith" <steven49@gmail.com>', // sender address
            to: "mitchellsantner@gmail.com , msdhoni7@gmail.com", //list of receivers
            subject: "Mission IPL 2024", // Subject Line
            text: "Yelllow forever , csk will wwin this season", //plain text body
            html: "<b>Chennai Super KIngs</b>", //html body
        }

        transporter.sendMail(message).then((info)=>{
            return res.status(201)
            .json({
                msg: "you should recieve an email",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            })
        }).catch(error=>{
            return res.status(500).json({error})
        })

    // res.status(201).json("SignUp sucessfully")
}

//send mail from real gmail account
const getBill = (req,res)=>{


const {userEmail} = req.body
    let config = {
        service : 'gmail',
        auth : {
            user : EMAIL,
            pass : PASSWORD
        }
    }
    let transporter = nodemailer.createTransport(config);
    let MailGenerator = new Mailgen ({
        theme : "default",
        product: {
            name : "Mailgen",
            link: 'https://mailgen.js/'
        }
    })

    let response  =  {
        
        body: {
            name : "sahil vaidya",
            intro: "Keep hope you will get sucess",
            table : 
                {
                data :[ 
                  {
                    item: "Nodemailer Stack Book",
                    description : "A backened application",
                    price: "$400",
                  }  
                ]
            },
            outro: "Keep learning until you don't know till end "
        
        }
    }
 

    let mail  = MailGenerator.generate(response)

    let message = {
        from : EMAIL ,
        to: userEmail,
        subect: "Find Job",
        html:  mail
    }

    transporter.sendMail(message).then(()=>{
        return res.status(201).json({
            msg: "Check the mail first"
        })
    }).catch(error=>{
        return res.status(500).json({error})
    })

    // res.status(201).json("getBill is sucessfull")
}

module.exports = {
    signUp , getBill
}



//////////////////////////////////////////////

