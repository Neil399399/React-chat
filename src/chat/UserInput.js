import React from 'react'
import './css/UserInput.css'
import { Segment, Button, Form, Icon } from 'semantic-ui-react'

function UserInput() {
    return (
        <Segment>
            <div style={{ display: 'flex' }}>
                <Form style={{ width: '100%' }}>
                    <Form.Field>
                        <Form.Input placeholder='Reply ...' />
                    </Form.Field >
                </Form>
                <Button>
                    <Button.Content >
                        <Icon name="send" />
                    </Button.Content>
                </Button>
            </div>
        </Segment>
    )
}
export default UserInput