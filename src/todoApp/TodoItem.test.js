import React from 'react';
import TodoItem from './TodoItem';
import { render } from '@testing-library/react';

describe('<TodoItem/>', () => {
    const sampleTodo = {
        id: 1,
        text: 'TDD 배우기',
        done: false
    }

    const setUp = (props = {}) => {
        const initialProps = { todo: sampleTodo }
        const utils = render(<TodoItem {...initialProps} {...props} />)
        const { getByText } = utils
        const todo = props.todo || initialProps.todo
        const span = getByText(todo.text)
        const button = getByText('삭제')
        return {
            ...utils,
            span,
            button
        }
    }

    it('has button and span', () => {
        const { span, button } = setUp()
        expect(span).toBeTruthy()
        expect(button).toBeTruthy() // false, 0, '', null, undefined, NaN 들은 falsy 값을 가진다. 나머지는 모두 truthy.
    })

    it('shows line-through on span when done is true', () => {
        const { span } = setUp({ todo: { ...sampleTodo, done: true } })
        expect(span).toHaveStyle('text-decoration: line-through;')
    })

    it('does not show line-through on span when done is false', () => {
        const { span } = setUp({ todo: { ...sampleTodo, done: false } });
        expect(span).not.toHaveStyle('text-decoration: line-through;');
    });
})