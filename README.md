# Hayyu

Hayyu is an online hotel booking web application built with Express.js.

## Features

- **User Authentication and Authorization**: Secure login and registration for users and admins.
- **Admin Management**: Admins can add, edit, and delete hotel data and blog posts.
- **Hotel Booking**: Users can browse and book hotels.
- **Blog**: Users can read blog posts about travel, hotels, and more.
- **Email Confirmation**: Users receive an email containing their booking ticket after completing a booking.

## Technologies Used

- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT) and bcrypt for password hashing
- **Email Service**: Nodemailer

## Installation

1. Clone the repository:

    ```bash
    https://github.com/AlfanDutaPamungkas/Hayyu.git
    ```

2. Navigate to the project directory:

    ```bash
    cd hayyu
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables. Create a `.env` file in the root directory and add the following:

    ```env
    PORT=3000
    DB_URLI=your_mongodb_uri
    JWT_KEY=your_jwt_key
    CLOUDINARY_NAME=your_cloudinary_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    CONTACT_EMAIL=your_email_for_contact
    PASSWORD_CONTACT_EMAIL=password_application_for_contact
    EMAIL=your_email_for_sending_ticket
    PASS_SEND_TICKET=password_application_for_sending_ticket
    ```

5. Start the server:

    ```bash
    node server.js
    ```

## Usage

1. Register or log in as a user or admin.
2. Admins can access the admin panel to manage hotel data and blog posts.
3. Users can browse hotels, make bookings, and read blog posts.
4. After completing a booking, users will receive an email containing their booking ticket.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Our Team
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/AlfanDutaPamungkas"><img src="https://avatars.githubusercontent.com/u/128448534?v=4?s=100" width="100px;" alt=""/><br /><sub><b>AlfanDutaPamungkas</b></sub></a></td>
      <td align="center"><a href="https://github.com/sulthan18"><img src="https://avatars.githubusercontent.com/u/126325594?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sulthan Rafi Hendriansyah</b></sub></a></td>
      <td align="center"><a href="https://github.com/Fariz214"><img src="https://avatars.githubusercontent.com/u/130908462?v=4" width="100px;" alt=""/><br /><sub><b>Muhammad Fariz Satria Maulana</b></sub></a></td>
      <td align="center"><a href="https://github.com/shaqil23"><img src="https://avatars.githubusercontent.com/u/129819903?v=4" width="100px;" alt=""/><br /><sub><b>Shakil Mardhika Azhar</b></sub></a></td>
      <td align="center"><a href="https://github.com/Dryannn"><img src="https://avatars.githubusercontent.com/u/95418088?v=4" width="100px;" alt=""/><br /><sub><b>Adrian Fathurahman</b></sub></a></td>
    </tr>
  </tbody>
</table>
