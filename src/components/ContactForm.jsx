import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const ContactForm = ({ setSubmitted }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    if (data) {
      setSubmitted(true);
    }
  };

  function errorStyling(errorName) {
    return errorName &&
      (errorName.type === 'required' ||
        errorName.type === 'maxLength' ||
        errorName.type === 'pattern' ||
        errorName.type === 'minLength')
      ? `contactInput border-0 border-l-[20px] ring-0 focus:ring-red-400 outline-none block border-red-400 focus:border-red-400 focus:outline-none w-full transition-all rounded-md bg-white/5 px-3.5 py-2 text-white shadow-sm sm:text-sm sm:leading-6`
      : `contactInput block border-0 border-red-400 focus:border-red-400 outline-none f w-full transition-all rounded-md bg-white/5 px-3.5 py-2 text-white shadow-sm sm:text-sm sm:leading-6`;
  }

  function printOutErrorText(error, maxNumber, name, minNumber) {
    const ErrorComponent = ({ children }) => {
      return <p className="text-red-500 pl-5 mt-2.5">{children}</p>;
    };

    if (error?.type === 'required' || error?.type === 'pattern') {
      return <ErrorComponent>{error.message}</ErrorComponent>;
    } else if (error?.type === 'maxLength') {
      return (
        <ErrorComponent>
          {name} cannot exceed {maxNumber} characters
        </ErrorComponent>
      );
    } else if (error?.type === 'minLength') {
      return (
        <ErrorComponent>
          {name} cannot be less then {minNumber} characters
        </ErrorComponent>
      );
    } else if (error?.type) {
      return <ErrorComponent>Unknown error</ErrorComponent>;
    }
  }

  useEffect(() => {
    const glowingLabelText = document.querySelectorAll('.labelText');
    const contactInputs = document.querySelectorAll('.contactInput');

    for (let i = 0; contactInputs.length > i; i += 1) {
      contactInputs[i].addEventListener('keyup', () => {
        if (contactInputs[i].value.length > 0) {
          glowingLabelText[i].classList.add('glowText');
          glowingLabelText[i].classList.remove('labelText');
        } else {
          glowingLabelText[i].classList.add('labelText');
          glowingLabelText[i].classList.remove('glowText');
        }
      });
    }
  }, []);

  return (
    <form
      className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstname"
              className="labelText block text-sm font-semibold leading-6 text-white transition-all"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                name="firstname"
                type="text"
                placeholder="First name"
                {...register('firstname', {
                  required: 'First name is required',
                  maxLength: 80,
                })}
                className={errorStyling(errors.firstname)}
              />
            </div>
            {printOutErrorText(errors.firstname, 80, 'First name')}
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="labelText block text-sm font-semibold leading-6 text-white"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                name="lastname"
                type="text"
                placeholder="Last name"
                {...register('lastname', {
                  required: 'Last name is required',
                  maxLength: 100,
                })}
                className={errorStyling(
                  errors.lastname,
                  'contactInputLastName'
                )}
              />
            </div>
            {printOutErrorText(errors.lastname, 100, 'Last name')}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="labelText block text-sm font-semibold leading-6 text-white"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                name="email"
                type="text"
                placeholder="Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid email adress',
                  },
                })}
                className={errorStyling(errors.email, 'contactInput')}
              />
            </div>
            {printOutErrorText(errors.email)}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="subject"
              className="labelText block text-sm font-semibold leading-6 text-white"
            >
              Subject
            </label>
            <div className="mt-2.5">
              <input
                name="subject"
                type="text"
                placeholder="Subject"
                {...register('subject', {
                  required: 'Subject is required',
                  maxLength: 50,
                })}
                className={errorStyling(errors.subject, 'contactInput')}
              />
            </div>
            {printOutErrorText(errors.subject, 50, 'Subject')}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="labelText block text-sm font-semibold leading-6 text-white"
            >
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                placeholder="Message"
                rows={3}
                {...register('message', {
                  required: 'Message is required',
                  minLength: 3,
                  maxLength: 800,
                })}
                className={errorStyling(errors.message, 'contactInput')}
              />
            </div>
            {printOutErrorText(errors.message, 800, 'Message', 3)}
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <input
            type="submit"
            value="Submit"
            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          />
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
