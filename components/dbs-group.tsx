import Head from "next/head";
import React from "react";
import * as axios from "axios";
import Countdown from "react-countdown";

export const HEADER_TITLE = {
    luong: "Bao nhiêu ngày nửa có lương",
    today: "Ngày hôm nay",
    tetDuong: "Bao nhiêu ngày đến tết dương",
    tetAm: "Bao nhiêu ngày đến tết âm lịch"
};
export const URL = {
    getDatetime: "https://delta-group.tk/api/get-time",
    // getDatetime: "http://localhost:3000/api/get-time",
}
export const CONFIG_DATA = {
    ngayLuong: 5,
    nextTetAm: new Date(2021, 2, 12)
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
                current: new Date(res.data.datetime).toDateString(),
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

            const nextTetDuong = new Date (
                this.state.datetime.getFullYear() + 1,
                1,1
            )
            const nextTetDuongMili = nextTetDuong.getTime() - this.state.datetime.getTime();

            const nextTetAmMili = CONFIG_DATA.nextTetAm.getTime()  - this.state.datetime.getTime();

            this.setState({
                nextLuong: Math.ceil(nextLuongMili/1000/60/60/24),
                nextTetDuong: Math.ceil(nextTetDuongMili/1000/60/60/24),
                nextTetAm: Math.ceil(nextTetAmMili/1000/60/60/24),
            })
        }
    }

    /**
     * UPDATE
     * @description this function use after update
     *
     */
    componentDidUpdate() {
    }

    /**
     * @description render to html and js
     */
    render() {
        console.log(this.state)
        const nextLuong = Number(this.state.nextLuong);
        return (
            <div className="home-component">
                <Head>
                    <title>DELTA - GROUP</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" href="/favicon.ico" />
                    <meta
                        name="description"
                        content="Count date down for delta-group"
                    />
                </Head>
                <div className="body">
                    <div className="row pt-3 m-0">
                        <div className="col-lg-12 d-flex justify-content-center">
                            <div className="card border-light mb-3 counter-wrap" style={{maxWidth: '18rem'}}>
                                <div
                                    className="card-header p-1 text-white text-center bg-warning">{HEADER_TITLE.today}</div>

                                <div className="card-body text-info text-center">
                                    <div className="counter-number">{this.state.current}</div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12 d-flex justify-content-center">
                            <div className="card border-light mb-3 counter-wrap" style={{maxWidth: '18rem'}}>
                                <div
                                    className="card-header p-1 text-white text-center bg-warning">{HEADER_TITLE.luong}</div>

                                <div className="card-body text-info text-center">
                                    <div className="counter-number">
                                        {this.state.nextLuong} <span>ngày</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12 d-flex justify-content-center">
                            <div className="card border-light mb-3 counter-wrap" style={{maxWidth: '18rem'}}>
                                <div
                                    className="card-header p-1 text-white text-center bg-warning">{HEADER_TITLE.tetDuong}</div>

                                <div className="card-body text-info text-center">
                                    <div className="counter-number">
                                        {this.state.nextTetDuong} <span>ngày</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12 d-flex justify-content-center">
                            <div className="card border-light mb-3 counter-wrap" style={{maxWidth: '18rem'}}>
                                <div
                                    className="card-header p-1 text-white text-center bg-warning">{HEADER_TITLE.tetAm}</div>

                                <div className="card-body text-info text-center">
                                    <div className="counter-number">
                                        {this.state.nextTetAm} <span>ngày</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}
