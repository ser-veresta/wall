const SET_OPEN = "setOpen";

export const setOpen = (payload) => ({ type: SET_OPEN, payload });

const initialValues = {
  open: false,
  type: "",
};

const reducer = (state = initialValues, action) => {
  switch (action.type) {
    case SET_OPEN:
      return { ...action.payload };

    default:
      return state;
  }
};

export default reducer;
