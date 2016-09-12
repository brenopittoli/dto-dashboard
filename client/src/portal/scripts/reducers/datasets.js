import initialState from './../store/initialState';


const datasetsReducer = (state = initialState.datasets, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default datasetsReducer;


// Helpers

export const getDatasetById = (state, id) => {
  return state.find((d) => Number(id) === d.id);
};
