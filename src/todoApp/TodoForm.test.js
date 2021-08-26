import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import TodoForm from './TodoForm'

describe('todoForm', () => {
    // 리팩터링
    // const setup = (props = {}) => {
    //     const utils = render(<TodoForm {...props} />);
    //     const { getByText, getByPlaceholderText } = utils;
    //     const input = getByPlaceholderText('할 일을 입력하세요'); // input 이 있는지 확인
    //     const button = getByText('등록'); // button이 있는지 확인
    //     return {
    //         ...utils,
    //         input,
    //         button
    //     };
    // };

    it('has input and a button', () => {
        const { getByText, getByPlaceholderText } = render(<TodoForm />)
        getByPlaceholderText('할 일을 입력하세요')
        getByText('등록')
    })

    it('changes input', () => {
        const { getByPlaceholderText } = render(<TodoForm />)
        const input = getByPlaceholderText('할 일을 입력하세요')
        fireEvent.change(input, {
            target: {
                value: 'TDD 배우기'
            }
        })
        expect(input).toHaveAttribute('value', 'TDD 배우기')
    })

    it('calls onInsert and clears input', () => {
        // jest.fn() 은 jest 에서 제공하는 mock 함수 (onInsert 라는 함수 정의를 미리 안해도 되도록 -> 테스트 주도 개발 가능)
        const onInsert = jest.fn()
        const { getByText, getByPlaceholderText } = render(<TodoForm onInsert={onInsert} />)
        const input = getByPlaceholderText('할 일을 입력하세요')
        const button = getByText('등록')
        fireEvent.change(input, {
            target: {
                value: 'TDD 배우기'
            }
        })
        fireEvent.click(button)
        expect(onInsert).toBeCalledWith('TDD 배우기') // onInsert 가 'TDD 배우기' 파라미터가 호출됐어야함
        expect(input).toHaveAttribute('value', '') // input이 비워져야함
    })
})
