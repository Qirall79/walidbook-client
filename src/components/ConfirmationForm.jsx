const ConfirmationForm = ({ setShowDeleteForm, remove }) => {
  const hideForm = () => {
    setShowDeleteForm(false);
  };
  return (
    <div className="flex p-1 gap-3 items-start flex-col">
      <p className="font-semibold">Are you sure ?</p>
      <div className="flex gap-5">
        <button
          className="px-3 py-1 bg-red-800 text-white rounded-md font-medium"
          onClick={remove}
        >
          Delete
        </button>
        <button
          className="px-3 py-1 bg-black text-white  rounded-md font-medium"
          onClick={hideForm}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationForm;
