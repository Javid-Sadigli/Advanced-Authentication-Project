const variables = require('../variables'); 
const sendgrid_variables = variables.SendGrid; 

const nodemailer = require('nodemailer');
const sendgrid_transport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgrid_transport({auth : {
    api_key : sendgrid_variables.api_key
}})); 

module.exports.SEND_Verify_Token = function(verify_token, email)
{
    return transporter.sendMail({
        from : sendgrid_variables.sender, 
        to : email, 
        subject : 'Verify your email', 
        html : `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="https://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
         <meta charset="UTF-8" />
         <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
         <!--[if !mso]><!-->
         <meta http-equiv="X-UA-Compatible" content="IE=edge" />
         <!--<![endif]-->
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <meta name="format-detection" content="telephone=no" />
         <meta name="format-detection" content="date=no" />
         <meta name="format-detection" content="address=no" />
         <meta name="format-detection" content="email=no" />
         <meta name="x-apple-disable-message-reformatting" />
         <link href="https://fonts.googleapis.com/css?family=Tektur:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900" rel="stylesheet" />
         <title>Untitled</title>
         <!-- Made with Postcards by Designmodo https://designmodo.com/postcards -->
         <style>
         html,
                 body {
                     margin: 0 !important;
                     padding: 0 !important;
                     min-height: 100% !important;
                     width: 100% !important;
                     -webkit-font-smoothing: antialiased;
                 }
         
                 * {
                     -ms-text-size-adjust: 100%;
                 }
         
                 #outlook a {
                     padding: 0;
                 }
         
                 .ReadMsgBody,
                 .ExternalClass {
                     width: 100%;
                 }
         
                 .ExternalClass,
                 .ExternalClass p,
                 .ExternalClass td,
                 .ExternalClass div,
                 .ExternalClass span,
                 .ExternalClass font {
                     line-height: 100%;
                 }
         
                 div[style*="margin: 14px 0"],
                 div[style*="margin: 16px 0"] {
                     margin: 0 !important;
                 }
         
                 table,
                 td,
                 th {
                     mso-table-lspace: 0 !important;
                     mso-table-rspace: 0 !important;
                     border-collapse: collapse;
                 }
         
                 body, td, th, p, div, li, a, span {
                     -webkit-text-size-adjust: 100%;
                     -ms-text-size-adjust: 100%;
                     mso-line-height-rule: exactly;
                 }
         
                 img {
                     border: 0;
                     outline: none;
                     line-height: 100%;
                     text-decoration: none;
                     -ms-interpolation-mode: bicubic;
                 }
         
                 a[x-apple-data-detectors] {
                     color: inherit !important;
                     text-decoration: none !important;
                 }
         
                 .pc-gmail-fix {
                     display: none;
                     display: none !important;
                 }
         
                 @media (min-width: 621px) {
                     .pc-lg-hide {
                         display: none;
                     } 
         
                     .pc-lg-bg-img-hide {
                         background-image: none !important;
                     }
                 }
         </style>
         <style>
         @media (max-width: 620px) {
         .pc-project-body {min-width: 0px !important;}
         .pc-project-container {width: 100% !important;}
         .pc-sm-hide {display: none !important;}
         .pc-sm-bg-img-hide {background-image: none !important;}
         .pc-w620-fontSize-30 {font-size: 30px !important;}
         .pc-w620-lineHeight-40 {line-height: 40px !important;}
         .pc-w620-fontSize-16 {font-size: 16px !important;}
         .pc-w620-lineHeight-26 {line-height: 26px !important;}
         .pc-w620-padding-35-35-35-35 {padding: 35px 35px 35px 35px !important;}
         
         .pc-w620-gridCollapsed-1 > tbody,.pc-w620-gridCollapsed-1 > tbody > tr,.pc-w620-gridCollapsed-1 > tr {display: inline-block !important;}
         .pc-w620-gridCollapsed-1.pc-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-width-fill > tr {width: 100% !important;}
         .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
         .pc-w620-gridCollapsed-1 > tbody > tr > td,.pc-w620-gridCollapsed-1 > tr > td {display: block !important;width: auto !important;padding-left: 0 !important;padding-right: 0 !important;}
         .pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-width-fill > tr > td {width: 100% !important;}
         .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;}
         .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-first > .pc-grid-td-first,pc-w620-gridCollapsed-1 > .pc-grid-tr-first > .pc-grid-td-first {padding-top: 0 !important;}
         .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-last > .pc-grid-td-last,pc-w620-gridCollapsed-1 > .pc-grid-tr-last > .pc-grid-td-last {padding-bottom: 0 !important;}
         
         .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-first > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-first > td {padding-top: 0 !important;}
         .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-last > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-last > td {padding-bottom: 0 !important;}
         .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-first,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-first {padding-left: 0 !important;}
         .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-last,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-last {padding-right: 0 !important;}
         
         .pc-w620-tableCollapsed-1 > tbody,.pc-w620-tableCollapsed-1 > tbody > tr,.pc-w620-tableCollapsed-1 > tr {display: block !important;}
         .pc-w620-tableCollapsed-1.pc-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-width-fill > tr {width: 100% !important;}
         .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
         .pc-w620-tableCollapsed-1 > tbody > tr > td,.pc-w620-tableCollapsed-1 > tr > td {display: block !important;width: auto !important;}
         .pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-width-fill > tr > td {width: 100% !important;}
         .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;}
         }
         @media (max-width: 520px) {
         .pc-w520-padding-30-30-30-30 {padding: 30px 30px 30px 30px !important;}
         }
         </style>
         <!--[if !mso]><!-->
         <style>
         @media all { @font-face { font-family: 'Tektur'; font-style: normal; font-weight: 600; src: url('https://fonts.gstatic.com/s/tektur/v3/XoHN2YHtS7q969kXCjzlV0aSkS_o8OacmTe0TYlYFot8TrzwUrtHacQ.woff') format('woff'), url('https://fonts.gstatic.com/s/tektur/v3/XoHN2YHtS7q969kXCjzlV0aSkS_o8OacmTe0TYlYFot8TrzwUrtHacI.woff2') format('woff2'); } @font-face { font-family: 'Tektur'; font-style: normal; font-weight: 400; src: url('https://fonts.gstatic.com/s/tektur/v3/XoHN2YHtS7q969kXCjzlV0aSkS_o8OacmTe0TYlYFot8TrwuVbtHacQ.woff') format('woff'), url('https://fonts.gstatic.com/s/tektur/v3/XoHN2YHtS7q969kXCjzlV0aSkS_o8OacmTe0TYlYFot8TrwuVbtHacI.woff2') format('woff2'); } @font-face { font-family: 'Tektur'; font-style: normal; font-weight: 900; src: url('https://fonts.gstatic.com/s/tektur/v3/XoHN2YHtS7q969kXCjzlV0aSkS_o8OacmTe0TYlYFot8TryHUrtHacQ.woff') format('woff'), url('https://fonts.gstatic.com/s/tektur/v3/XoHN2YHtS7q969kXCjzlV0aSkS_o8OacmTe0TYlYFot8TryHUrtHacI.woff2') format('woff2'); } @font-face { font-family: 'Tektur'; font-style: normal; font-weight: 500; src: url('https://fonts.gstatic.com/s/tektur/v3/XoHN2YHtS7q969kXCjzlV0aSkS_o8OacmTe0TYlYFot8TrwcVbtHacQ.woff') format('woff'), url('https://fonts.gstatic.com/s/tektur/v3/XoHN2YHtS7q969kXCjzlV0aSkS_o8OacmTe0TYlYFot8TrwcVbtHacI.woff2') format('woff2'); } @font-face { font-family: 'Tektur'; font-style: normal; font-weight: 800; src: url('https://fonts.gstatic.com/s/tektur/v3/XoHN2YHtS7q969kXCjzlV0aSkS_o8OacmTe0TYlYFot8TryuUrtHacQ.woff') format('woff'), url('https://fonts.gstatic.com/s/tektur/v3/XoHN2YHtS7q969kXCjzlV0aSkS_o8OacmTe0TYlYFot8TryuUrtHacI.woff2') format('woff2'); } @font-face { font-family: 'Tektur'; font-style: normal; font-weight: 700; src: url('https://fonts.gstatic.com/s/tektur/v3/XoHN2YHtS7q969kXCjzlV0aSkS_o8OacmTe0TYlYFot8TrzJUrtHacQ.woff') format('woff'), url('https://fonts.gstatic.com/s/tektur/v3/XoHN2YHtS7q969kXCjzlV0aSkS_o8OacmTe0TYlYFot8TrzJUrtHacI.woff2') format('woff2'); } }
         </style>
         <!--<![endif]-->
         <!--[if mso]>
            <style type="text/css">
                .pc-font-alt {
                    font-family: Arial, Helvetica, sans-serif !important;
                }
            </style>
            <![endif]-->
         <!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
        </head>
        
        <body class="pc-font-alt" style="width: 100% !important;min-height: 100% !important;margin: 0 !important;padding: 0 !important;line-height: 1.5;color: #2D3A41;mso-line-height-rule: exactly;-webkit-font-smoothing: antialiased;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;font-variant-ligatures: none;text-rendering: optimizeLegibility;-moz-osx-font-smoothing: grayscale;background-color: #f4f4f4;" bgcolor="#f4f4f4">
         <table class="pc-project-body" style="table-layout: fixed;min-width: 600px;background-color:#f4f4f4;" bgcolor="#f4f4f4" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
          <tr>
           <td align="center" valign="top">
            <table class="pc-project-container" style="width: 600px; max-width: 600px;" width="600" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
             <tr>
              <td style="padding: 20px 0px 20px 0px;" align="left" valign="top">
               <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="width: 100%;">
                <tr>
                 <td valign="top">
                  <!-- BEGIN MODULE: Header 2 -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                   <tr>
                    <td style="padding: 0px 0px 0px 0px;">
                     <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                      <tr>
                       <!--[if !gte mso 9]><!-->
                       <td valign="top" class="pc-w520-padding-30-30-30-30 pc-w620-padding-35-35-35-35" style="background-size: cover; background-position: center; background-repeat: no-repeat;padding: 40px 40px 40px 40px;border-radius: 0px;background-color: #1B1B1B;" bgcolor="#1B1B1B" background="https://cloudfilesdm.com/postcards/image-1706020898899.jpg">
                        <!--<![endif]-->
                        <!--[if gte mso 9]>
                        <td valign="top"  align="center" style="background-size: cover; background-position: center; background-repeat: no-repeat;background-color: #1B1B1B;border-radius: 0px;" bgcolor="#1B1B1B" background="https://cloudfilesdm.com/postcards/image-1706020898899.jpg">
                    <![endif]-->
                        <!--[if gte mso 9]>
                        <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                            <v:fill src="https://cloudfilesdm.com/postcards/image-1706020898899.jpg" color="#1B1B1B" type="frame" size="1,1" aspect="atleast" origin="0,0" position="0,0"/>
                            <v:textbox style="mso-fit-shape-to-text: true;" inset="0,0,0,0">
                                <div style="font-size: 0; line-height: 0;">
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                        <tr>
                                            <td style="font-size: 14px; line-height: 1.5;" valign="top">
                                                <p style="margin:0;mso-hide:all"><o:p xmlns:o="urn:schemas-microsoft-com:office:office">&nbsp;</o:p></p>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                                    <tr>
                                                        <td colspan="3" height="40" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="40" valign="top" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                                        <td valign="top" align="left">
                        <![endif]-->
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                         <tr>
                          <td align="center" valign="top" style="padding: 0px 0px 30px 0px;">
                           <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="margin-right: auto; margin-left: auto;">
                            <tr>
                             <td valign="top" class="pc-font-alt pc-w620-fontSize-30 pc-w620-lineHeight-40" align="center" style="mso-line-height: exactly;line-height: 128%;letter-spacing: -0.6px;font-family: Tektur, Arial, Helvetica, sans-serif;font-size: 36px;font-weight: 800;color: #ffffff;text-align: center;text-align-last: center;">
                              <div><span>Verify your email.</span>
                              </div>
                             </td>
                            </tr>
                           </table>
                          </td>
                         </tr>
                        </table>
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                         <tr>
                          <td align="center" valign="top" style="padding: 0px 0px 29px 0px;">
                           <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="margin-right: auto; margin-left: auto;">
                            <tr>
                             <td valign="top" class="pc-font-alt pc-w620-fontSize-16 pc-w620-lineHeight-26" align="center" style="padding: 0px 50px 0px 50px;mso-padding-left-alt: 0; margin-left:50px;mso-line-height: exactly;line-height: 156%;letter-spacing: -0.2px;font-family: Tektur, Arial, Helvetica, sans-serif;font-size: 18px;font-weight: 300;color: #ffffff;text-align: center;text-align-last: center;">
                              <div style="text-align: left; "><span>&#xFEFF;</span>
                              </div>
                              <div style="text-align: left; "><span>Dear user,</span>
                              </div>
                              <div style="text-align: left; "><span>You have registered at our website.﻿</span>
                              </div>
                              <div style="text-align: left; "><span>Please click the link below to verify your email.</span>
                              </div>
                              <div style="text-align: left; "><span>﻿</span>
                              </div>
                              <div style="text-align: left; "><span>Best regards,</span>
                              </div>
                              <div style="text-align: left; "><span>Javid Sadigli.</span>
                              </div>
                              <div style="text-align: left; "><span>﻿</span>
                              </div>
                              <div><span>﻿</span>
                              </div>
                             </td>
                            </tr>
                           </table>
                          </td>
                         </tr>
                        </table>
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                         <tr>
                          <td align="center">
                           <table class="pc-width-hug pc-w620-gridCollapsed-0" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                            <tr class="pc-grid-tr-first pc-grid-tr-last">
                             <td class="pc-grid-td-first pc-grid-td-last" valign="top" style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                               <tr>
                                <td align="center" valign="top">
                                 <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                   <td align="center" valign="top">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                     <tr>
                                      <th valign="top" align="center" style="padding: 0px 0px 0px 0px;font-weight: normal;line-height: 1;">
                                       <!--[if mso]>
                <table  border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="border-collapse: separate;margin-right: auto; margin-left: auto;">
                    <tr>
                        <td valign="middle" align="center" style="text-align: center;color: #ffffff;border-radius: 8px;background-color: #575757;padding: 15px 17px 15px 17px;mso-padding-left-alt: 0; margin-left:17px;" bgcolor="#575757">
                                            <a class="pc-font-alt" style="display: inline-block;text-decoration: none;font-family: Tektur, Arial, Helvetica, sans-serif;font-weight: 500;font-size: 16px;line-height: 150%;letter-spacing: -0.2px;color: #ffffff;" target="_blank">Verify your email</a>
                                        </td>
                    </tr>
                </table>
                <![endif]-->
                                       <!--[if !mso]><!-- --><a style="border-radius: 8px;background-color: #575757;padding: 15px 17px 15px 17px;font-family: Tektur, Arial, Helvetica, sans-serif;font-weight: 500;font-size: 16px;line-height: 150%;letter-spacing: -0.2px;color: #ffffff;text-align: center;text-align-last: center;text-decoration: none;display: inline-block;vertical-align: top;-webkit-text-size-adjust: none;" target="_blank" href="http://${variables.hostname}:${variables.port}/verify_token/${verify_token}">Verify your email</a>
                                       <!--<![endif]-->
                                      </th>
                                     </tr>
                                    </table>
                                   </td>
                                  </tr>
                                 </table>
                                </td>
                               </tr>
                              </table>
                             </td>
                            </tr>
                           </table>
                          </td>
                         </tr>
                        </table>
                        <!--[if gte mso 9]>
                                                        </td>
                                                        <td width="40" style="line-height: 1px; font-size: 1px;" valign="top">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="3" height="40" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <p style="margin:0;mso-hide:all"><o:p xmlns:o="urn:schemas-microsoft-com:office:office">&nbsp;</o:p></p>
                            </v:textbox>
                        </v:rect>
                        <![endif]-->
                       </td>
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
                  <!-- END MODULE: Header 2 -->
                 </td>
                </tr>
                <tr>
                 <td>
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                   <tr>
                    <td align="center" valign="top" style="padding-top: 20px; padding-bottom: 20px; vertical-align: top;">
                     <a href="https://designmodo.com/postcards?uid=MjMwNTgx&type=footer" target="_blank" style="text-decoration: none; overflow: hidden; border-radius: 2px; display: inline-block;">
                      <img src="https://cloudfilesdm.com/postcards/promo-footer-dark.jpg" width="198" height="46" alt="Made with (o -) postcards" style="width: 198px; height: auto; margin: 0 auto; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; vertical-align: top;">
                     </a>
                     <img src="https://api-postcards.designmodo.com/tracking/mail/promo?uid=MjMwNTgx" width="1" height="1" alt="" style="display:none; width: 1px; height: 1px;">
                    </td>
                   </tr>
                  </table>
                 </td>
                </tr>
               </table>
              </td>
             </tr>
            </table>
           </td>
          </tr>
         </table>
         <!-- Fix for Gmail on iOS -->
         <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
         </div>
        </body>
        
        </html>
        `
    });
};

