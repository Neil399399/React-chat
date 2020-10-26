import React from 'react'
import './css/UserInput.css'
import { Segment, Button, Form, Icon } from 'semantic-ui-react'

function UserInput() {
    return (
        <Segment>
            <div style={{ display: 'flex' }}>
                <Form style={{ width: '100%', marginRight: '1%' }}>
                    <Form.Field>
                        <Form.Input placeholder='Reply ...' />
                    </Form.Field >
                </Form>
                <Button icon="image" />
                <Button icon="send" />
            </div>
        </Segment>
    )
}
export default UserInput