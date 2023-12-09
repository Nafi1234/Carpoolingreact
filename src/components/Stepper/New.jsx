import { useState } from "react";
import Stepper from "./Parts/Stepper";
import StepperControl from "./Parts/Steppercontrol";
import { UseContextProvider } from "./context/StepperContext";
import { useStepperContext } from "./context/StepperContext";
import Account from "./Parts/Steps/Account";
import Details from "./Parts/Steps/Detail";
import Payment from "./Parts/Steps/Payment";
import Final from "./Parts/Steps/Final";
import Confirm from "./Parts/Steps/Confirm";
import { useRidepublishMutation } from "../../store/Registerapisilice";
import { useDispatch, useSelector } from "react-redux";
import { selectPickupLocation } from "../../store/Pickupreducer";
import { selectDropoffLocation } from "../../store/Pickupreducer";
import { selectdate } from "../../store/DateSlice";
import { selectPrice } from "../../store/Priceslice";
import { selectpassenger } from "../../store/PassengerSlice";
import { selectTime } from "../../store/timeSilice";
import { selectVehicleName } from "../../store/Vehiclename";
import { selectRegistrationNo } from "../../store/Vehiclename";
function New() {
  const [currentStep, setCurrentStep] = useState(1);
  const { userData } = useStepperContext();
  const pickupLocation = useSelector(selectPickupLocation);
  const dropoffLocation = useSelector(selectDropoffLocation);
  const date = useSelector(selectdate);
  const Fare = useSelector(selectPrice);
  const passenger = useSelector(selectpassenger);
  const Vechiclename = useSelector(selectVehicleName);
  const Registrationno = useSelector(selectRegistrationNo);
  const [publishRide] = useRidepublishMutation();
  const token = localStorage.getItem("access_token");
  const steps = ["Location", "Map", "Date", "Vechicle Information", "Confirm"];
  const time = useSelector(selectTime);
  console.log(token);

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account />;
      case 2:
        return <Details />;
      case 3:
        return <Payment />;
      case 4:
        return <Final />;
      case 5:
        return <Confirm />;
      default:
    }
  };

  const handleClick = async (direction) => {
    console.log("Entering handleClick function");
    let newStep = currentStep;
    console.log(currentStep, steps.length);

    if (currentStep === steps.length - 1 && direction === "next") {
      if (
        !Registrationno ||
        !Vechiclename ||
        Fare === null ||
        Fare === undefined
      ) {
        console.log(
          "Please provide all required information.",
          Vechiclename,
          Fare
        );
        return; // Exit function and prevent moving to the next step
      }

      try {
        console.log("Publishing ride with data:", {
          pickupLocation,
          dropoffLocation,
          date,
          Fare,
          passenger,
          token,
          time,
          Vechiclename,
          Registrationno,
        });

        const response = await publishRide({
          pickupLocation,
          dropoffLocation,
          date,
          Fare,
          passenger,
          token,
          time,
          Vechiclename,
          Registrationno,
        });

        console.log("Response from publishRide:", response.data);
        console.log("status message", response.data.success);

        if (response.data.success === true) {
          newStep = newStep + 1;
          setCurrentStep(newStep);
          console.log("Updated currentStep:", newStep);
          console.log("Ride published successfully");
        }
      } catch (error) {
        console.error("Error publishing ride:", error);
      }
    } else {
      newStep = direction === "next" ? newStep + 1 : newStep - 1;
      newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }
  };

  return (
    <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2 mt-20  ">
      <div className="horizontal container mt-5 ">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="my-10 p-10 ">
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </div>
      </div>

      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )}
    </div>
  );
}

export default New;
