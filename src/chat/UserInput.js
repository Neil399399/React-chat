import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Segment, Button, Form } from 'semantic-ui-react'
import { useService } from '@xstate/react'
import { SocketMachineMg as SocketMachine } from '@aetheras/ejchatjs'
import { mongooseimSocketService } from './chatMachineStart'

function UserInput() {
    const [, mgSend] = useService(mongooseimSocketService)

    const onSubmit = (values, { resetForm }) => {
        resetForm()
        let msg = {
            contentType: "TEXT",
            content: values.message
        }
        mgSend({
            type: SocketMachine.EVENTS.SEND_GROUPCHAT,
            room: "aliceroom",
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
                    <div style={{ display: 'flex' }}>
                        <Form style={{ width: '100%', marginRight: '1%' }} onSubmit={handleSubmit}>
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
                        </Form>
                        <Button type="submit" icon="send" />
                    </div>
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
