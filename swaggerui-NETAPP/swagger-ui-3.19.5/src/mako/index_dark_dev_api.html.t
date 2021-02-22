<!-- HTML for static distribution bundle build -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>ONTAP REST API</title>
    <link rel="stylesheet" type="text/css" href="./swagger-ui.css" >
    <link rel="icon" type="image/png" href="./favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="./favicon-16x16.png" sizes="16x16" />
    <style>
      html
      {
        box-sizing: border-box;
        overflow: -moz-scrollbars-vertical;
        overflow-y: scroll;
      }

      *,
      *:before,
      *:after
      {
        box-sizing: inherit;
      }

      body
      {
        margin:0;
        background: #fafafa;
      }
    </style>
  </head>

  <body>
    <div id="swagger-ui"></div>

    <script src="./swagger-ui-bundle.js"> </script>
    <script src="./swagger-ui-standalone-preset.js"> </script>
    <script>

    function getLocale() {
      if(navigator.userLanguage) {
          return navigator.userLanguage;
      } else if(navigator.language) {
          return navigator.language;
      } else if(navigator.browserLanguage) {
          return navigator.browserLanguage;
      } else {
          return 'other';
      }
    }

    window.onload = function() {
      // Begin Swagger UI call region
      const ui = SwaggerUIBundle({
        url: "https://" + window.location.hostname + "/docs/api/openapi_dark.yaml",
        dom_id: '#swagger-ui',
        deepLinking: true,
        validatorUrl: null,
        enableDownloadBar: true,
        operationsSorter: "ntap",
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
      })
      // End Swagger UI call region

      window.ui = ui

      if(getLocale() == "ja") {
          document.getElementById("contact").setAttribute("href", "https://www.fujitsu.com/jp/support");
          document.getElementById("contact").innerText = "https://www.fujitsu.com/jp/support";
      } else {
          document.getElementById("contact").setAttribute("href", "http://www.fujitsu.com/global/support");
          document.getElementById("contact").innerText = "http://www.fujitsu.com/global/support";
      }
    }
  </script>

  <footer class="swagger-ui">
    <div class="wrapper">

    <h1>Copyright information</h1>

    <p>Copyright © 2020 ${COPYRIGHT_BRAND_TEXT}. All rights reserved. ${US}</p>

    <p>
    No part of this document covered by copyright may be reproduced in any form or by any 
    means—graphic, electronic, or mechanical, including photocopying, recording, taping, 
    or storage in an electronic retrieval system—without prior written permission of the 
    copyright owner.
    </p>

    <p>
    Software derived from copyrighted NetApp material is subject to the following 
    license and disclaimer: 
    </p>

    <p>
    THIS SOFTWARE IS PROVIDED BY ${CAPS_BRAND} "AS IS" AND WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES,
    INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A 
    PARTICULAR PURPOSE, WHICH ARE HEREBY DISCLAIMED. IN NO EVENT SHALL ${CAPS_BRAND} BE LIABLE FOR ANY 
    DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT 
    NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
    OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
    STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE 
    USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    </p>

    <p>
    ${BRAND} reserves the right to change any products described herein at any time, and without notice. 
    ${BRAND} assumes no responsibility or liability arising from the use of products described herein, 
    except as expressly agreed to in writing by ${BRAND}. The use or purchase of this product does not 
    convey a license under any patent rights, trademark rights, or any other intellectual property 
    rights of ${BRAND}. 
    </p>

    <p>
    The product described in this manual may be protected by one or more U.S. patents, 
    foreign patents, or pending applications.
    </p>

    <p>
    RESTRICTED RIGHTS LEGEND: Use, duplication, or disclosure by the government is subject to 
    restrictions as set forth in subparagraph (c)(1)(ii) of the Rights in Technical Data and 
    Computer Software clause at DFARS 252.277-7103 (October 1988) and FAR 52-227-19 (June 1987).
    </p>

    <h1>Trademark information</h1>

    <p>
    ${TRADEMARK}
    </p>

    <h1>Feedback</h1>

    <p>How to send comments about documentation and receive update notifications</p>

    ${CONTACT_US}

    </div>
  </footer>
  </body>
</html>
