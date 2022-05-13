import { useReducer } from 'react'

export const initialState = {
  myKitties: {},
  kittieIdsOnSale: [],
  kittiesOnSale: {},
  breed: { dame: null, sire: null },
  haveFreeKitty: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_KITTIES':
      return { ...state, myKitties: { ...action.payload } }
    case 'SET_HAVE_FREE_KITTY':
      return { ...state, haveFreeKitty: action.payload }
    case 'CHOSE_KITTY_FOR_BREED':
      const { id, role } = action.payload

      // if kitty is already chosen for breed as other parent
      if (Object.values(state.breed).includes(id)) {
        return { ...state, breed: { ...initialState.breed, [role]: id } }
      }
      return { ...state, breed: { ...state.breed, [role]: id } }
    case 'ERASE_BREEDING':
      return { ...state, breed: { ...initialState.breed } }
    case 'SET_ALL_TOKEN_IDS_ON_SALE':
      return { ...state, kittieIdsOnSale: [...action.payload] }
    case 'SET_ALL_KITTIES_ON_SALE':
      return { ...state, kittiesOnSale: { ...action.payload } }

    default:
      return state
  }
}
