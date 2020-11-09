import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Segment, Button, Form } from 'semantic-ui-react'
import { useService } from '@xstate/react'
import { SocketMachineMg as SocketMachine } from '@aetheras/ejchatjs'
import { mongooseimSocketService } from '../utils/chatMachineStart'

function UserInput({ roomId }) {
    const [, mgSend] = useService(mongooseimSocketService)

    const onSubmit = (values, { resetForm }) => {
        resetForm()
        let msg = {
            contentType: "TEXT",
            content: values.message
        }
        mgSend({
            type: SocketMachine.EVENTS.SEND_GROUPCHAT,
            room: roomId,
            message: msg,
        })
    }

    return (
        <Segment>
            <Formik
                initialValues={{ message: "" }}
                onSubmit={onSubmit}
                validationSchema={validateSchema}
            >
                {({ handleSubmit, values, handleChange, handleBlur, touched, errors }) => (
                    <Form style={{ display: 'flex' }} onSubmit={handleSubmit}>
                        <div style={{ width: '100%', marginRight: '1%', display: 'flex', flexDirection: 'column' }}>
                            <Form.Field>
                                <Form.Input
                                    placeholder='Reply ...'
                                    name='message'
                                    fluid
                                    value={values.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.message && errors.message) && errors.message}
                                />
                            </Form.Field >
                        </div>
                        <div style={{
                            display: 'flex', flexDirection: 'column',
                        }}>
                            <Button type="submit" icon="send" />
                        </div>
                    </Form>
                )}
            </Formik>
        </Segment>
    )
}
export default UserInput

const validateSchema = yup.object().shape({
    message: yup
        .string()
        .required('required')
})
