import Head from "next/head";
import React from "react";
import * as axios from "axios";

export const HEADER_TITLE = {
    luong: "Bao nhiêu ngày đến lương",
};

interface Props {
}

interface State {
    datetime: string | Date;
}
export class DbsGroup extends React.Component<Props, State> {
    constructor(props) {
        super(props);

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
        const res = await axios.default({
            method: 'GET',
            url: 'https://delta-group.tk/api/get-time',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            timeout: 10000
        })
        if (res) {
            return {
                datetime: new Date(res.data.datime),
            }
        }
    }

    /**
     * INIT
     * @description this function use after render
     * process data
     *
     * @return void
     */
    componentDidMount() {
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
        return (
            <div className="home-component">
                <Head>
                    <title>DETA - GROUP</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                </Head>
                <div className="body">
                    <div className="row pt-3">
                        <div className="col-lg-12 d-flex justify-content-center">
                            <div className="card border-light mb-3 counter-wrap" style={{maxWidth: '18rem'}}>
                                <div
                                    className="card-header p-1 text-white text-center bg-warning">{HEADER_TITLE.luong}</div>

                                <div className="card-body text-info text-center">
                                    <div className="counter-number">{this.state.datetime}</div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        );
    }
}
