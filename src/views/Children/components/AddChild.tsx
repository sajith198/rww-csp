import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import AddSponsorForm from './AddChildForm'

type AddSponsorProps = {
    openDialog: () => void
    dialogIsOpen: boolean
    onDialogClose: () => void
    onDialogOk: () => void
}

const AddChild = (props: AddSponsorProps) => {
    const { dialogIsOpen, onDialogClose, onDialogOk } = props

    let formData = {
        firstName: '',
        lastName: '',
        email: '',
        dialCode: '',
        phoneNumber: '',
        place: '',
        dob: '',
    }

    return (
        <div>
            {/* <Button variant="solid" onClick={() => openDialog()}>
                Open Dialog
            </Button> */}
            <Dialog
                isOpen={dialogIsOpen}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <AddSponsorForm data={formData} />
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={onDialogOk}>
                        Okay
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default AddChild
