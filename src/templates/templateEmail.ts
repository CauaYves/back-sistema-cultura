function generateHtml(email: string, code: string, texts: string[]) {
  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body
    style="
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
        sans-serif;
    "
  >
    <table border="0" cellspacing="0" cellpadding="0" style="max-width: 600px">
      <tr>
        <td>
          <table
            width="100%"
            border="0"
            cellspacing="0"
            cellpadding="0"
          ></table>
        </td>
      </tr>
      <tr height="16"></tr>
      <tr>
        <td>
          <table
            bgcolor="#4184F3"
            width="100%"
            border="0"
            cellspacing="0"
            cellpadding="0"
            style="
              min-width: 332px;
              max-width: 600px;
              border: 1px solid #e0e0e0;
              border-bottom: 0;
              border-top-left-radius: 3px;
              border-top-right-radius: 3px;
            "
          >
            <tr>
              <td height="72px" colspan="3"></td>
            </tr>
            <tr>
              <td width="32px"></td>
              <td
                style="
                  font-family: Roboto-Regular, Helvetica, Arial, sans-serif;
                  font-size: 24px;
                  color: #ffffff;
                  line-height: 1.25;
                "
              >
                ${texts[0]}
              </td>
              <td width="32px"></td>
            </tr>
            <tr>
              <td height="18px" colspan="3"></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table
            bgcolor="#FAFAFA"
            width="100%"
            border="0"
            cellspacing="0"
            cellpadding="0"
            style="
              min-width: 332px;
              max-width: 600px;
              border: 1px solid #f0f0f0;
              border-bottom: 1px solid #c0c0c0;
              border-top: 0;
              border-bottom-left-radius: 3px;
              border-bottom-right-radius: 3px;
            "
          >
            <tr height="16px">
              <td width="32px" rowspan="3"></td>
              <td></td>
              <td width="32px" rowspan="3"></td>
            </tr>
            <tr>
              <td>
                <p>
                    ${texts[1]}
                  <span style="color: #659cef" dir="ltr">${email}</span>.
                </p>
                <div style="text-align: center">
                  <p dir="ltr">
                    <strong
                      style="
                        text-align: center;
                        font-size: 24px;
                        font-weight: bold;
                      "
                      >${code}</strong
                    >
                  </p>
                </div>
                <p>
                  ${texts[2]}
                </p>
                <p>
                     Se você não reconhece a conta ${email}, isso significa que alguém provavelmente deu seu endereço de e-mail por engano. Nesse caso, ignore esta mensagem.
                </p>
                <p>Atenciosamente,<br />Equipe das Contas do Culturalize</p>
              </td>
            </tr>
            <tr height="32px"></tr>
          </table>
        </td>
      </tr>
      <tr height="16"></tr>
      <tr>
        <td
          style="
            max-width: 600px;
            font-family: Roboto-Regular, Helvetica, Arial, sans-serif;
            font-size: 10px;
            color: #bcbcbc;
            line-height: 1.5;
          "
        >
          <table>
            <tr>
              <td></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
  return html;
}

export { generateHtml };
