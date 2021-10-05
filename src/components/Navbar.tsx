import React, {FC} from "react";
import {Header} from "antd/es/layout/layout";
import {Layout, Menu, Row} from "antd";
import {useHistory} from 'react-router-dom';
import {RoutNames} from "../router";
import {useTypeSelector} from "../hooks/useTypeSelector";
import {useDispatch} from "react-redux";
import {AuthActionCreator} from "../store/reducers/auth/action-creators";
import {useActions} from "../hooks/useActions";

const Navbar: FC = () => {
    const router = useHistory();
    const {isAuth, user}= useTypeSelector(state => state.auth);
    const {logout}= useActions()
    const dispatch = useDispatch();

    return (
        <Layout.Header>
            <Row justify={"end"}>
                {isAuth
                    ?
                    <>
                        <div style={{color: 'white'}}>
                            {user.username}
                        </div>
                        <Menu theme={"dark"}>
                            <Menu.Item
                                onClick={ logout}
                                key={1}
                            >Out</Menu.Item>
                        </Menu>
                    </>
                    :
                    <Menu theme={"dark"}>
                        <Menu.Item
                            onClick={() => router.push(RoutNames.LOGIN)}
                            key={1}
                        >Login</Menu.Item>
                    </Menu>
                }

            </Row>
        </Layout.Header>
    )
}

export default Navbar;