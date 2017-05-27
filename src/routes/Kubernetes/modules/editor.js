import { fetchResource } from '../../../api'

// ------------------------------------
// Constants
// ------------------------------------
export const OPEN_RESOURCE = 'OPEN_RESOURCE'
export const SAVE_RESOURCE = 'SAVE_RESOURCE'
export const DETACH_EDITOR = 'DETACH_EDITOR'

// ------------------------------------
// Actions
// ------------------------------------
export function openResource (resource) {
  return (dispatch) => {
    return fetchResource(resource.metadata.name, resource.kind, resource.metadata.namespace, {
      type: 'yaml',
    }).then(resourceYaml => dispatch({
      type: OPEN_RESOURCE,
      payload: {
        data: resource,
        yaml: resourceYaml,
      },
    }))
  }
}

export function saveResource () {
  return {
    type: SAVE_RESOURCE,
  }
}

export function detachEditor () {
  return {
    type: DETACH_EDITOR,
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const actionHandlers = {
  [OPEN_RESOURCE]: (state, action) => ({
    ...state,
    activeResource: action.payload.data,
    activeResourceYaml: action.payload.yaml,
  }),

  [SAVE_RESOURCE]: (state, action) => {
    console.error('SAVE_RESOURCE not implemented yet')
    return state
  },

  [DETACH_EDITOR]: (state, action) => ({
    ...state,
    activeResource: null,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  activeResource: null,
  activeResourceYaml: '',
}

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
