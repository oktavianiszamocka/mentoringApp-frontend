import React, { Component } from 'react'
import axios from 'axios'

class AllComments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allComment: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:57864/api/posts/1/comment')
            .then(response => {
                console.log(response)
                this.setState({ allComment: response.data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { allComments } = this.state
        return (
            <div>
                All comments will be visible here
                {

                    allComments && allComments.map(allComment => <div key={allComment.idComment}> {allComment.comment} </div>)

                }


            </div>
        )
    }
}


export default AllComments;