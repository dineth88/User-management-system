import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchQuestions,
} from '../features/questions/questionsSlice';
import {
    fetchUserAnswers,
    addAnswer,
    updateAnswer,
    deleteAnswer,
} from '../features/answers/answersSlice';

const UserDashboard = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.items);
    const userAnswers = useSelector((state) => state.answers.items);

    const [answer, setAnswer] = useState('');
    const [editingAnswer, setEditingAnswer] = useState(null);
    const [editedText, setEditedText] = useState('');

    useEffect(() => {
        dispatch(fetchQuestions());
        dispatch(fetchUserAnswers());
    }, [dispatch]);

    const handleAnswerSubmit = async (questionId) => {
        try {
            await dispatch(addAnswer({ questionId, text: answer })).unwrap(); // Optimistically update
            setAnswer(''); // Clear the answer input
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };
    
    

    const handleEditAnswer = (answerId) => {
        dispatch(updateAnswer({ answerId, text: editedText }));
        setEditingAnswer(null);
        setEditedText('');
    };

    const handleDeleteAnswer = (answerId) => {
        dispatch(deleteAnswer(answerId));
    };

    return (
        <div>
            <h1>User Dashboard</h1>
            <h2>Questions</h2>
            {questions.map((question) => (
                <div key={question.id}>
                    <p>{question.text}</p>
                    <textarea
                        placeholder="Type your answer here..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                    <button onClick={() => handleAnswerSubmit(question.id)}>Submit Answer</button>
                </div>
            ))}
            <h2>Your Answers</h2>
            {userAnswers.map((ans) => (
                <div key={ans.id}>
                    <p>Question: {ans.question.text}</p>
                    {editingAnswer === ans.id ? (
                        <>
                            <textarea
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                            />
                            <button onClick={() => handleEditAnswer(ans.id)}>Save</button>
                            <button onClick={() => setEditingAnswer(null)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <p>Answer: {ans.text}</p>
                            <button onClick={() => setEditingAnswer(ans.id)}>Edit</button>
                            <button onClick={() => handleDeleteAnswer(ans.id)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default UserDashboard;
