import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import AddSponsorForm from './AddSponsorForm'

type AddSponsorProps = {
    openDialog: () => void
    dialogIsOpen: boolean
    onDialogClose: () => void
    onDialogOk: () => void
}

const AddSponsor = (props: AddSponsorProps) => {
    const { dialogIsOpen, onDialogClose, onDialogOk } = props
    return (
        <div>
            <Dialog
                width={800}
                // height={'100vh'}
                isOpen={dialogIsOpen}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <AddSponsorForm onDialogClose={onDialogClose} />
            </Dialog>
        </div>
    )
}

export default AddSponsor
