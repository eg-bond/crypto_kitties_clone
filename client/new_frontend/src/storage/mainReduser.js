export const initialState = {
  kittieIdsOwned: [],
  page: 1,
  myKitties: {},
  kittieIdsOnSale: [],
  kittiesOnSale: {},
  breed: { mother: null, father: null },
  haveFreeKitty: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_KITTIES':
      console.log('action.payload', action.payload)
      return { ...state, myKitties: { ...action.payload } }
    case 'SET_HAVE_FREE_KITTY':
      return { ...state, haveFreeKitty: action.payload }
    case 'CHOSE_KITTY_FOR_BREED':
      const { id, role } = action.payload

      // if kitty is already chosen for breed as other parent
      if (Object.values(state.breed).includes(id)) {
        return { ...state, breed: { ...initialState.breed, [role]: id } }
      }
      // default
      return { ...state, breed: { ...state.breed, [role]: id } }
    case 'ERASE_BREEDING':
      return { ...state, breed: { ...initialState.breed } }
    case 'SET_ALL_TOKEN_IDS_ON_SALE':
      return { ...state, kittieIdsOnSale: [...action.payload] }
    case 'SET_ALL_KITTIES_ON_SALE':
      return { ...state, kittiesOnSale: { ...action.payload } }

    case 'SET_KITTIES_IDS_OWNED':
      return { ...state, kittieIdsOwned: [...action.payload] }
    case 'ADD_KITTIES':
      return { ...state, myKitties: { ...state.myKitties, ...action.payload } }
    case 'CLEAR_KITTIES':
      return { ...state, myKitties: {} }
    case 'SET_PAGE':
      return { ...state, page: action.payload }

    default:
      return state
  }
}
