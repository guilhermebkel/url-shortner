import React, { Component } from 'react'
import { Input, Form, Message, Button } from 'semantic-ui-react'

import Head from '../components/Head'
import './style.css'

import UrlShortnerService, { API } from '../services'

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state = {
            url: '',
            shortName: '',
            shortUrl: '',
            loading: false,
            success: false,
            error: false,
            errorMessage: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(key, value){
        this.setState({
            [key]: value
        })
    }

    async handleSubmit(){
        this.setState({ loading: true })

        const data = {
            url: this.state.url,
            id: this.state.shortName.length ? this.state.shortName : undefined
        }

        const response = await UrlShortnerService.createShortUrl(data.url, data.id)
        
        if(!response.result){
            return this.setState({
                url: '',
                shortName: '',
                shortUrl: '',
                loading: false,
                success: false,
                error: true,
                errorMessage: response.message
            })
        }

        this.setState({ 
            url: '',
            shortName: '',
            shortUrl: response.short_url,
            loading: false,
            success: true,
            error: false,
            errorMessage: ''
        })
    }

    render(){
        return (
            <>
                <Head />
                <Form 
                    loading={this.state.loading} 
                    onSubmit={this.handleSubmit} 
                    success={this.state.success}
                    error={this.state.error}
                >
                    <Form.Group widths='equal'>
                        <Form.Input 
                            icon='keyboard outline' 
                            placeholder='Type a url...' 
                            onChange={event => this.handleChange('url', event.target.value)}
                            required
                        />
                        <Input 
                            label={API + '/u/'}
                            placeholder='Type a shortname...' 
                            onChange={event => this.handleChange('shortName', event.target.value)}
                        />
                    </Form.Group>
                    <Message
                        success
                        header='Done!'
                        content="Your new short url is shown below!"
                    />
                    <Message
                        error
                        header='Error!'
                        content={this.state.errorMessage}
                    />
                    <Button>Submit</Button>
                </Form>
                    <Input
                        action={{
                            color: 'black',
                            labelPosition: 'right',
                            icon: 'copy',
                            content: 'Copy',
                        }}
                        value={this.state.shortUrl}
                    />
            </>
        )
    }
}