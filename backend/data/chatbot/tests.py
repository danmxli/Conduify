def mock():
    mock_starter_message = "This is mock data. Thank you for your interest in joining Cohere as a Software Engineer. Based on your resume, I can see that you have experience in various programming languages such as Python, Typescript, and Rust. One of our key focuses at Cohere is AI and NLP, so my question to you is: \n\nCan you discuss a project from your resume where you utilized your skills in Python and Typescript to work on an AI-integrated productivity visualization workspace with the Cohere API?"
    
    mock_evaluation_message = "Strengths:\n- The mock data response provides a clear and concise overview of the technologies used in the project, including Python, Django, Typescript, React, and MongoDB.\n- The applicant highlights the specific uses of each technology, such as Python for backend development and Django for server-side logic.\n\nAreas for Improvement:\n- The response does not directly address the question about the integration of AI technology and the benefits it brought to the productivity visualization workspace. It would be helpful to provide more specific information about how AI was incorporated into the project and how it enhanced productivity visualization.\n- It would also be beneficial to mention any specific challenges faced in integrating AI and how they were overcome."

    return {
        "starter_message": mock_starter_message,
        "evaluation_message": mock_evaluation_message
    }


