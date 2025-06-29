const reachOutMail = (fullName, mobileNumber) =>{

 return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Template</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f6f6;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .button {
      display: inline-block;
      background-color: #007bff;
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 5px;
      text-decoration: none;
      margin-top: 20px;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #888888;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Hello Vasanth,</h2>
    <p>${fullName} want to reach out you.</p>
    <p>His phone number: ${mobileNumber}</p>

    <div class="footer">
      &copy; 2025 Your Company. All rights reserved.
    </div>
  </div>
</body>
</html>
`
}

module.exports = {
    reachOutMail    
}