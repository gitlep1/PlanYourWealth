import "./About.scss";

export const About = () => {
  return (
    <div className="about-container">
      <h1>About</h1>
      <p>
        Welcome to the Calcutor! This project is designed to meet your
        calculation needs by offering both a **Basic Calculator** and a
        **Scientific Calculator**. Whether you need quick arithmetic operations
        or advanced mathematical functions, this app has you covered.
      </p>
      <p>
        The **Basic Calculator** provides a simple and user-friendly interface
        for everyday calculations like addition, subtraction, multiplication,
        and division. The **Scientific Calculator**, on the other hand, includes
        advanced features such as trigonometric functions, logarithms, and power
        calculations, making it suitable for students, professionals, and anyone
        tackling complex mathematical problems.
      </p>
      <p>
        Built with React.js and styled using modern SCSS, this app is partially
        responsive and partially optimized for use on both desktop and mobile
        devices. It showcases essential React concepts such as component-based
        architecture, state management, and event handling.
      </p>
      <p>
        I hope this app enhances your productivity and provides an enjoyable
        user experience. Feel free to explore, provide feedback, or contribute
        to its development. Thank you for choosing Calcutor!
      </p>
    </div>
  );
};
