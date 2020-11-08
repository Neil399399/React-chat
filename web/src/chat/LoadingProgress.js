import React from 'react'
import { Modal, Loader } from 'semantic-ui-react'

function LoadingProgress({ state, handleClose }) {
    return (
        <Modal
            basic
            onClose={handleClose}
            open={state}
            size='small'
        >
            <Loader size="huge" content='Loading...' />
        </Modal>
    )
}
export default LoadingProgress