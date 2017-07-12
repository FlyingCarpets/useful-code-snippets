import React from 'react';
import axios from 'axios';
import { Modal } from 'bootstrap.native';
import './Modal.scss';

export default class ModalWindow extends React.Component {
    constructor() {
        super();

        this.state = {
            modalData: {},
            currentContentIndex: ''
        }
    }
    componentWillMount() {
        this.fetchModalData();
    }
    fetchModalData() {
        axios({
            method: 'GET',
            url: 'http://beta.json-generator.com/api/json/get/Ek9-geyrm',
            responseType: 'json'
        }).then((response) => {
            this.setState({
                modalData: response.data,
                currentContentIndex: 0
            });

            this.initModal();

        }).catch((error) => {});
    }
    initModal() {
        this.modal = new Modal(this.refs.customModal,
            {
                backdrop: true,
                keyboard: true
            });
    }
    handleModalOpen() {
        this.modal.show();
    }
    placeNextContent() {
        let contentIndex = this.state.currentContentIndex;
        contentIndex++;

        this.setState({
            currentContentIndex: contentIndex
        })
    }
    placePreviousontent() {
        let contentIndex = this.state.currentContentIndex;
        contentIndex--;

        this.setState({
            currentContentIndex: contentIndex
        })
    }
    render() {
        const { modalData, currentContentIndex } = this.state;

        if (Object.keys(modalData).length === 0 && modalData.constructor === Object) {
            return null;
        } else {
            return (
                <div>
                    <button onClick={() => this.handleModalOpen()}
                            type="button"
                            data-toggle="modal"
                            data-target="#customModal"
                            className="btn">
                        Open modal
                    </button>

                    <div id="customModal"
                         ref="customModal"
                         className="modal fade"
                         tabIndex="-1"
                         role="dialog"
                         aria-hidden="true">

                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h4 className="text-heading">
                                        {modalData.modals[currentContentIndex].title}
                                    </h4>
                                    <div className="btn-wrapper">
                                        <button type="button"
                                                className="btn--outlined"
                                                data-dismiss="modal"
                                                aria-label="Close">
                                            <i className="fa fa-times" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="modal-body">
                                    {modalData.modals[currentContentIndex].content}
                                </div>

                                <div className="modal-footer">
                                    <div className="pull-left">
                                        <div className="btn-group">
                                            <button onClick={() => this.placePreviousontent()}
                                                    type="button"
                                                    className={`btn${currentContentIndex == 0 ? " is-disabled" : ''}`}>
                                                <i className="fa fa-chevron-left" aria-hidden="true"/>
                                            </button>
                                            <button onClick={() => this.placeNextContent()}
                                                    type="button"
                                                    className={`btn${(currentContentIndex+1) == modalData.modals.length ? " is-disabled" : ''}`}>
                                                <i className="fa fa-chevron-right" aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </div>

                                    <button type="button" className="btn btn-primary">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )
        }
    }
}
