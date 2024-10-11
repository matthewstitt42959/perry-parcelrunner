import { Button } from '@windmill/react-ui';

export default function StandardButton({ text, onClick }) {
  return (
    <Button
      className={`bg-purple text-white hover:bg-purple-700 px-button py-button`} // Use custom classes
      onClick={onClick}
    >
      {text}
      
    </Button>
    //Ensure the variable {text} is passed to populate the buttons with the different strings
  );
}