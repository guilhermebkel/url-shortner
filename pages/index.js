import React, { Component } from 'react'
import { Input, Form, Message, Button } from 'semantic-ui-react'

import Head from '../components/Head'
import './style.css'

import UrlShortnerService, { API } from '../services'

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: '',
            shortName: '',
            shortUrl: '',
            loading: false,
            success: false,
            error: false,
            errorMessage: '',
            isCopied: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCopy = this.handleCopy.bind(this)
    }

    handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }

    async handleSubmit() {
        this.setState({ loading: true, isCopied: false })

        const data = {
            url: this.state.url,
            id: this.state.shortName.length ? this.state.shortName : undefined
        }

        const response = await UrlShortnerService.createShortUrl(data.url, data.id)

        this.setState({
            url: !response.result ? this.state.url : '',
            shortName: '',
            shortUrl: !response.result ? '' : response.short_url,
            loading: false,
            success: !response.result ? false : true,
            error: !response.result ? true : false,
            errorMessage: !response.result ? response.message : ''
        })
    }

    handleCopy() {
        var shortUrlField = document.getElementById('short-url')
        shortUrlField.select();
        shortUrlField.setSelectionRange(0, 99999)

        document.execCommand('copy')
        this.setState({ isCopied: true })
        setTimeout(() => {
            this.setState({ isCopied: false })
        }, 2000)
    }

    render() {
        return (
            <>
                <Head />
                <div style={{
                    display: 'flex',
                    height: "100vh",
                    width: "100vw",
                    backgroundColor: "#F6F6F6"
                }}>
                    <div style={{
                        margin: '50px auto',
                    }}>
                        <Form
                            loading={this.state.loading}
                            onSubmit={this.handleSubmit}
                            success={this.state.success}
                            error={this.state.error}
                        >
                            <Form.Input
                                placeholder='Paste a url...'
                                onChange={event => this.handleChange('url', event.target.value)}
                                value={this.state.url}
                                action={{
                                    color: 'black',
                                    labelPosition: 'right',
                                    icon: 'keyboard outline',
                                    content: 'Submit',
                                }}
                                required
                            />
                            <Form.Input
                                placeholder='Choose a shortname...'
                                onChange={event => this.handleChange('shortName', event.target.value)}
                                value={this.state.shortName}
                                action={{
                                    content: API + '/u/',
                                }}
                                actionPosition={'left'}
                                style={{PointerEvents: "none"}}
                            />
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
                        </Form>
                        {
                            this.state.success && <Input
                                id="short-url"
                                action={{
                                    color: this.state.isCopied ? 'green' : 'black',
                                    labelPosition: 'right',
                                    icon: 'copy',
                                    content: this.state.isCopied ? 'Copied!' : 'Copy',
                                    onClick: this.handleCopy,
                                    onSubmit: ''
                                }}
                                value={this.state.shortUrl}
                            />
                        }
                    </div>
                </div>
            </>
        )
    }
}