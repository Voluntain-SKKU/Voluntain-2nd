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
        titles: '',
        id: 1,
      }
    actions = {
      setValue: (value) => {
            this.setState({value});
        }
    }
    
    render() {
        const { state, actions } = this;
        // Provider 내에서 사용할 값은, "value" 라고 부릅니다.
        // 현재 컴포넌트의 state 와 actions 객체를 넣은 객체를 만들어서,
        // Provider 의 value 값으로 사용하겠습니다.
        const value = { state, actions };
        return (
          <Provider value={value}>
            {this.props.children}
          </Provider>
        )
    };
};


export { TitleProvider, TitleConsumer };

