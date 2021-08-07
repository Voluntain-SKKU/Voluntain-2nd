import React, {Component, createContext} from "react";

/**
 * Context 생성
 */
export const TitleContext = createContext({ });

const { Provider, Consumer: TitleConsumer } = TitleContext; 

/**
 * Provider Component 만들기
 */
class TitleProvider extends Component {
    /**
     * Context 객체에 담을 상태값, 메소드 정의
     */
    state = {
        id: 0,
        titles: 'scratch',
      }
    actions = {
      setValue: (value) => {
            this.setState({value});
        }
    }
    
    render() {
        const { state, actions } = this;

        const value = { state, actions };
        return (
          <Provider value={value}>
            {this.props.children}
          </Provider>
        )
    };
};


export { TitleProvider, TitleConsumer };

