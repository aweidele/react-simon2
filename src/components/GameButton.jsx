export const GameButton = () => {
  function handleClick() {
    alert("clicked");
  }
  return (
    <button className="w-[43%] cursor-pointer pointer-events-none" onClick={handleClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 345.845 345.845">
        <path className="pointer-events-auto" d="M245.51 245.51c-14.21 14.21-25.368 30.762-33.165 49.192a153.502 153.502 0 0 0-11.906 51.143H0c1.113-44.722 10.448-88.105 27.785-129.1 17.882-42.278 43.486-80.25 76.096-112.864 32.61-32.61 70.584-58.214 112.864-76.096C257.737 10.445 301.123 1.113 345.845 0v200.439a153.377 153.377 0 0 0-51.143 11.906c-18.43 7.794-34.981 18.953-49.191 33.166Z" />
      </svg>
    </button>
  );
};
