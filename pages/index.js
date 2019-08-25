import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

import Head from '../components/Head'
import './style.css'

import UrlShortnerService from '../services'

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state = {
            url: '',
            shortName: '',
            shortUrl: '',
            loading: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleNewShortUrl = this.handleNewShortUrl.bind(this)
    }

    handleChange(key, value){
        this.setState({
            [key]: value
        })
    }

    async handleNewShortUrl(){
        const data = {
            url: this.state.url,
            id: this.state.shortName.length ? this.state.shortName : undefined
        }

        const { short_url } = await UrlShortnerService.createShortUrl('www.teste.com')
        this.setState({ shortUrl: short_url })
    }

    render(){
        return (
            <>
                <Head />
                <div style={Styles.shortnerContainer}>
                    <Input 
                        loading={this.state.loading} 
                        icon='keyboard outline' 
                        placeholder='Type a url...' 
                        onChange={event => this.handleChange('url', event.target.value)}
                    />
                    <Input 
                        label='gbkel.herokuapp.com/u/' 
                        placeholder='Type a shortname...' 
                        onChange={event => this.handleChange('shortName', event.target.value)}
                    />
                    <Input
                        action={{
                            color: 'black',
                            labelPosition: 'right',
                            icon: 'copy',
                            content: 'Copy',
                        }}
                        value={this.state.shortUrl}
                    />
                </div>

            </>
        )
    }
}