import { useRef, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();
    const email = emailRef.current.value;

    if (email) {
      notificationCtx.showNotification({
        title: "Signing Up...",
        message: "Registering for newsletter.",
        status: "pending",
      });

      fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              throw new Error(`Something went wrong: ${data.message}`);
            });
          }
        })
        .then((data) => {
          notificationCtx.showNotification({
            title: "Success!",
            message: "Successfully registered for newsletter",
            status: "success",
          });
          console.log(data);
        })
        .catch((error) => {
          notificationCtx.showNotification({
            title: "Error!",
            message: `Something went wrong: ${error.message}`,
            status: "error",
          });
        });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
