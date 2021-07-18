import Head from "next/head";
import React, { useState } from "react";
import * as axios from "axios";
import {ClockLoader} from "react-spinners";
import {css} from "@emotion/core";
import {HEADER_TITLE, URL, DBS_CONFIG_DATA, LOCALSTORAGE_KEY} from "../config/constain";
import {GetStaticProps} from "next";
import {DropdownButton, Dropdown, Button, InputGroup, FormControl, Modal, Spinner} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import vi from 'date-fns/locale/vi';
registerLocale('vi', vi)

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  transform: translateY(50%);
  background-color: rgba(255, 255, 255, 0.5);
`;

interface MemberCachly {
    _id: string;
    name: string;
    startDate: Date;
}

interface Props {
}

interface State {
    datetime: Date;
    ngayCoLuong: number;
    current: string | Date;
    nextLuong: number;
    nextTetDuong: number;
    nextTetAm: number;
    cachLyMembers: Array<MemberCachly>;
    selectedMember: MemberCachly;
    selectedDatepicker: Date;
    isShowDatePicker: boolean;
    newMemberInput: string;
    isUpdate: boolean;
    titleDialog: string;
    isLoading: boolean;
}
export const getStaticProps: GetStaticProps = async ({}) => {
    return {
        props: {},
        revalidate: 10
    }
}
export class DbsGroup extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            datetime: new Date(),
            ngayCoLuong: null,
            current: null,
            nextLuong: null,
            nextTetDuong: null,
            nextTetAm: null,
            cachLyMembers: [],
            selectedMember: null,
            selectedDatepicker: new Date(),
            isShowDatePicker: false,
            newMemberInput: '',
            isUpdate: false,
            titleDialog: '',
            isLoading: false,
        }
    }


    /**
     * INIT && UPDATED
     * @description this function use after init, and before render
     *
     * @param props
     * @param state
     *
     * @return object state
     */
    static async getDerivedStateFromProps(props: Props, state: State) {
        return state
    }

    /**
     * INIT
     * @description this function use after render
     * process data
     *
     * @return void
     */
    async componentDidMount() {
        this.getAllMember();
        // ReactGA.initialize('G-6QKVW0QB9Z');
        // ReactGA.pageview(window.location.pathname + window.location.search);
        const res = await axios.default({
            method: 'GET',
            url: URL.getDatetime,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            timeout: 10000
        })

        if (res) {
            this.setState({
                datetime: new Date(res.data.datetime),
                current: new Date(res.data.datetime).toLocaleDateString(),
            })
            const nowMonth = this.state.datetime.getMonth();
            const nextLuongMonth = nowMonth + 1 > 12 ?
                nowMonth + 1 - 12 :
                nowMonth + 1;
            const nextLuong = new Date(
                this.state.datetime.getFullYear(),
                this.state.datetime.getMonth() + 1,
                5)
            const nextLuongMili = nextLuong.getTime() - this.state.datetime.getTime();

            const nextTetDuong = new Date(
                this.state.datetime.getFullYear() + 1,
                0, 0
            )
            const nextTetDuongMili = nextTetDuong.getTime() - this.state.datetime.getTime();

            const nextTetAmMili = DBS_CONFIG_DATA.nextTetAm.getTime() - this.state.datetime.getTime();

            this.setState({
                nextLuong: Math.ceil(nextLuongMili / 1000 / 60 / 60 / 24),
                nextTetDuong: Math.ceil(nextTetDuongMili / 1000 / 60 / 60 / 24),
                nextTetAm: Math.ceil(nextTetAmMili / 1000 / 60 / 60 / 24),
            })
        }
    }

    /**
     * UPDATE
     * @description this function use after update
     *
     */
    componentDidUpdate() {
        this.setCachlyStorage();
    }

    /**
     * @description on change show infor member cach_ly
     */
    onChangeMember(member) {
        this.setState({
            selectedMember: member,
        });
        // this.setCachlyStorage();
    }

    /**
     * @description get all memeber cach_ly
     */
    async getAllMember() {
        const res = await axios.default({
            method: 'GET',
            url: URL.getMember,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            timeout: 10000
        })

        if (res) {
            this.setState({
                cachLyMembers: res.data.members.map(item => {
                    item.startDate = new Date(item.startDate);
                    return item;
                }),
            });
            this.loadCachlyStorage();
        }
    }

    /**
     * 
     * @param date @description set date picker
     */
    setStartDate(date: any) {
        this.setState({
            selectedDatepicker: date,
        })
    }

    /**
     * 
     */
    async onClickSavePicker() {
        // error
        this.setState({
            isLoading: true,
        });
        const res = await axios.default({
            method: 'POST',
            url: URL.addMember,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: {name: this.state.newMemberInput, startDate: this.state.selectedDatepicker},
        });
        if (res) {
            this.getAllMember();
            this.setState({
                isLoading: false,
                isShowDatePicker: false,
                selectedMember: {name: this.state.newMemberInput, startDate: this.state.selectedDatepicker, _id: res.data.message.insertedId},
                newMemberInput: '',
            })
        } else {
            // error
            this.setState({
                isLoading: false,
            });
        }
    }

    /**
     * @description on reset cach ly
     */
    async onResetCachly(selectedMember) {
        this.setState({
            isUpdate: true,
            isShowDatePicker: true,
            selectedDatepicker: selectedMember.startDate,
            titleDialog: selectedMember.name,
        });
    }

    async onClickUpdatePicker () {
        this.setState({
            isLoading: true,
        });
        const res = await axios.default({
            method: 'PUT',
            url: URL.updateMember,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: {name: this.state.titleDialog, startDate: this.state.selectedDatepicker, _id: this.state.selectedMember._id},
        });
        if (res) {
            this.getAllMember();
            this.setState({
                isLoading: false,
                isUpdate: false,
                isShowDatePicker: false,
                selectedMember: {name: this.state.selectedMember.name, startDate: this.state.selectedDatepicker, _id: this.state.selectedMember._id},
                newMemberInput: '',
            });
        } else {
            // error
            this.setState({
                isLoading: false,
            });
        }
    }

    /**
     * @description load storage
     */
    loadCachlyStorage() {
        const resRaw = localStorage.getItem(LOCALSTORAGE_KEY.CACH_LY_MEMBER);
        if (resRaw) {
            const res = JSON.parse(resRaw);
            if (res) {
                if (this.state.cachLyMembers.find(item => item._id === res._id)) {
                    res.startDate = new Date(res.startDate);
                    this.setState({
                        selectedMember: res,
                    });
                }
            }
        }
    }

    /**
     * @description set storage
     * @returns 
     */
    setCachlyStorage() {
        if (this.state.selectedMember) {
            localStorage.setItem(LOCALSTORAGE_KEY.CACH_LY_MEMBER, JSON.stringify(this.state.selectedMember));
        }
    }

    /**
     * @description render to html and js
     */
    render() {
        const nextLuong = Number(this.state.nextLuong);
        return (
            <div className="home-component">
                <Head>
                    <title>DELTA - GROUP</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" href="/crab-icon.ico"/>
                    <meta
                        name="description"
                        content="DBS ngày đến lương, ngày đến tết, ngày được nghĩ, ngày đi chơi, ..."
                    />
                    <meta property="og:url" content="https://delta-group.tk/"/>
                    <meta property="og:type" content="article"/>
                    <meta property="og:title" content="DELTA - GROUP"/>
                    <meta property="og:description"
                          content="DBS ngày đến lương, ngày đến tết, ngày được nghĩ, ngày đi chơi, ..."/>
                    <meta property="og:image" content="/crab-icon.png"/>
                    {/*<img src="/crab-icon.png" alt="DBS ngày đến lương, ngày đến tết, ngày được nghĩ, ngày đi chơi, ..."/>*/}
                    <meta name="twitter:card" content="summary_large_image"/>
                </Head>
                <div className="body">
                    <div className="row pt-3 m-0">
                        <div className="col-lg-12 d-flex justify-content-center">
                            <div className="card border-light mb-3 counter-wrap" style={{maxWidth: '18rem'}}>
                                <div
                                    className="card-header p-1 text-white text-center bg-warning">{HEADER_TITLE.today}</div>
                                {
                                    !this.state.current ?
                                        <ClockLoader
                                            css={override}
                                            size={50}
                                            color={"#880088"}
                                            loading={true}
                                        /> :
                                        <div className="card-body text-info text-center">
                                            {/*<div className="counter-number">{this.state.current}</div>*/}
                                            <div className="counter-number">
                                                Ngày <span>{this.state.datetime.getDate()}</span> tháng <span>{this.state.datetime.getMonth() + 1}</span> năm <span>{this.state.datetime.getFullYear()}</span>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>

                        <div className="col-lg-12 d-flex justify-content-center">
                            <div className="card border-light mb-3 counter-wrap" style={{maxWidth: '18rem'}}>
                                <div className="card-header p-1 text-white text-center bg-warning">{HEADER_TITLE.cachly}</div>
                                <div className="d-flex justify-content-between p-2">
                                    <div className="pr-2">
                                        <DropdownButton id="dropdown-item-button"
                                        title={this.state.selectedMember ? this.state.selectedMember.name : "Xem danh mục"}
                                        size="sm">
                                            {
                                                this.state.cachLyMembers.map(member => {
                                                    return <Dropdown.Item as="button" key={member._id} onClick={() => this.onChangeMember(member)}>{member.name} - <span className="text-warning">{member.startDate.toLocaleDateString()}</span></Dropdown.Item>
                                                })
                                            }
                                        </DropdownButton>
                                    </div>

                                    <div>
                                    <InputGroup className="mb-3" size="sm">
                                        <FormControl placeholder="Thêm mới" value={this.state.newMemberInput} onChange={(event) => {this.setState({newMemberInput: event.target.value})}}/>
                                        <Button id="button-addon2" size="sm" variant="danger"
                                        onClick={() => {this.setState({isShowDatePicker: true, isUpdate: false, titleDialog: this.state.newMemberInput});}}
                                        disabled={!this.state.newMemberInput || this.state.newMemberInput == ''}>
                                            Thêm
                                        </Button>
                                    </InputGroup>
                                    </div>
                                </div>
                                <div className="card-body text-info text-center p-1">
                                    {
                                        this.state.selectedMember ?
                                        Math.round((new Date().getTime() - this.state.selectedMember.startDate.getTime())/1000/60/60/24) >= 0 ?
                                                <span>Đã được </span> 
                                            :   <span>Sẽ cách ly sau </span>
                                        : ""
                                    }
                                    <div className="counter-number">{
                                        this.state.selectedMember && typeof this.state.selectedMember.startDate === 'object' ?
                                        Math.abs(Math.round((new Date().getTime() - this.state.selectedMember.startDate.getTime())/1000/60/60/24)):
                                        'Chọn danh mục'
                                    }
                                    {
                                        this.state.selectedMember ? <span> ngày</span> : ""
                                    }
                                    </div>
                                </div>
                                <div>
                                    <Button className="w-100" id="button-addon2" size="sm" variant="danger"
                                    disabled={!this.state.selectedMember}
                                    onClick={() => {this.onResetCachly(this.state.selectedMember)}}>
                                        Reset lại ngày cách ly
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12 d-flex justify-content-center">
                            <div className="card border-light mb-3 counter-wrap" style={{maxWidth: '18rem'}}>
                                <div
                                    className="card-header p-1 text-white text-center bg-warning">{HEADER_TITLE.luong}</div>
                                {
                                    !this.state.current ?
                                        <ClockLoader
                                            css={override}
                                            size={50}
                                            color={"#880088"}
                                            loading={true}
                                        /> :
                                        <div className="card-body text-info text-center">
                                            <div className="counter-number">{this.state.nextLuong} <span>ngày</span>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>

                        <div className="col-lg-12 d-flex justify-content-center">
                            <div className="card border-light mb-3 counter-wrap" style={{maxWidth: '18rem'}}>
                                <div
                                    className="card-header p-1 text-white text-center bg-warning">{HEADER_TITLE.tetDuong}</div>
                                {
                                    !this.state.current ?
                                        <ClockLoader
                                            css={override}
                                            size={50}
                                            color={"#880088"}
                                            loading={true}
                                        /> :
                                        <div className="card-body text-info text-center">
                                            <div className="counter-number">{this.state.nextTetDuong} <span>ngày</span>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>

                        <div className="col-lg-12 d-flex justify-content-center">
                            <div className="card border-light mb-3 counter-wrap" style={{maxWidth: '18rem'}}>
                                <div
                                    className="card-header p-1 text-white text-center bg-warning">{HEADER_TITLE.tetAm}</div>
                                {
                                    !this.state.current ?
                                        <ClockLoader
                                            css={override}
                                            size={50}
                                            color={"#880088"}
                                            loading={true}
                                        /> :
                                        <div className="card-body text-info text-center">
                                            <div className="counter-number">{this.state.nextTetAm} <span>ngày</span>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.isShowDatePicker} size='sm' onHide={() => {this.setState({isShowDatePicker: false})}}>
                    <Modal.Header closeButton>
                    <Modal.Title>Hi <span>{this.state.titleDialog}</span></Modal.Title>
                    </Modal.Header>
                    <div className="pr-2 pl-2">Chọn ngày bắt đầu cách ly/giản cách đi nà:</div>
                    <DatePicker dateFormat="d-MM-yyyy" locale="vi" className="w-100 p-2 bg-warning"
                    selected={this.state.selectedDatepicker}
                    onChange={(date) => this.setStartDate(date)}/>

                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => {this.setState({isShowDatePicker: false})}}>
                        Huỷ bỏ
                    </Button>
                    {
                        this.state.isUpdate ? 
                            <Button variant="primary" onClick={() => {this.onClickUpdatePicker()}} disabled={this.state.isLoading}>
                                {
                                    this.state.isLoading ? 
                                        <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        /> : ''
                                }
                                Cập nhật
                            </Button>
                        :
                            <Button variant="primary" onClick={() => {this.onClickSavePicker()}} disabled={this.state.isLoading}>
                                {
                                    this.state.isLoading ? 
                                        <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        /> : ''
                                }
                                Lưu lại
                            </Button>
                    }
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

