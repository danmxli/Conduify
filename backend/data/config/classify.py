import cohere
from cohere.responses.classify import Example
import os
from dotenv import load_dotenv

load_dotenv('.env')

co = cohere.Client(os.getenv('COHERE_KEY'))

INTERVIEW = 'conduct interview'
ANALYZE = 'analyze resume'

EXAMPLES = [
    Example('ask about my experience with agile methodologies', INTERVIEW),
    Example('conduct a problem-solving exercise', INTERVIEW),
    Example('ask about my experience with software testing', INTERVIEW),
    Example('assess my understanding of data structures', INTERVIEW),
    Example('conduct a role-play scenario', INTERVIEW),
    Example('ask about my experience with cloud technologies', INTERVIEW),
    Example('assess my understanding of machine learning algorithms', INTERVIEW),
    Example('conduct a case study analysis', INTERVIEW),
    Example('ask about my experience with database management', INTERVIEW),
    Example('assess my understanding of cybersecurity principles', INTERVIEW),
    Example('conduct a design thinking exercise', INTERVIEW),
    Example('ask about my experience with front-end development', INTERVIEW),
    Example('assess my understanding of back-end development', INTERVIEW),
    Example('conduct a pair programming exercise', INTERVIEW),
    Example('ask about my experience with DevOps practices', INTERVIEW),
    Example('assess my understanding of artificial intelligence concepts', INTERVIEW),
    Example('conduct a system design exercise', INTERVIEW),
    Example('ask about my experience with mobile app development', INTERVIEW),
    Example('assess my understanding of network protocols', INTERVIEW),
    Example('conduct a debugging exercise', INTERVIEW),
    Example('ask about my experience with data visualization tools', INTERVIEW),
    Example('assess my understanding of operating systems', INTERVIEW),
    Example('conduct a whiteboard coding session', INTERVIEW),
    Example('ask about my experience with version control systems', INTERVIEW),
    Example('assess my understanding of computer architecture', INTERVIEW),
    Example('conduct a logic puzzle exercise', INTERVIEW),
    Example('ask about my experience with API development', INTERVIEW),
    Example('assess my understanding of software engineering principles', INTERVIEW),
    Example('conduct a brainstorming session', INTERVIEW),
    Example('ask about my experience with project management tools', INTERVIEW),
    Example('assess my understanding of web development frameworks', INTERVIEW),
    Example('conduct a code review session', INTERVIEW),
    Example('ask about my experience with user interface design', INTERVIEW),
    Example('assess my understanding of user experience principles', INTERVIEW),
    Example('conduct a technical presentation', INTERVIEW),
    Example('ask about my experience with hardware troubleshooting', INTERVIEW),
    Example('assess my understanding of software optimization techniques', INTERVIEW),
    Example('conduct a conflict resolution scenario', INTERVIEW),
    Example('ask about my experience with data mining techniques', INTERVIEW),
    Example('assess my understanding of object-oriented programming', INTERVIEW),
    Example('conduct a leadership scenario', INTERVIEW),
    Example('ask about my experience with statistical analysis tools', INTERVIEW),
    Example('assess my understanding of algorithm design', INTERVIEW),
    Example('conduct a time management exercise', INTERVIEW),
    Example('ask about my experience with quality assurance practices', INTERVIEW),
    Example('assess my understanding of software documentation standards', INTERVIEW),
    Example('conduct a negotiation scenario', INTERVIEW),
    Example('ask about my experience with business intelligence tools', INTERVIEW),
    Example('assess my understanding of data modeling techniques', INTERVIEW),
    Example('conduct a customer service scenario', INTERVIEW),

    Example('analyze my experience with agile methodologies', ANALYZE),
    Example('evaluate my problem-solving exercises', ANALYZE),
    Example('analyze my experience with software testing', ANALYZE),
    Example('evaluate my understanding of data structures', ANALYZE),
    Example('analyze my role-play scenarios', ANALYZE),
    Example('evaluate my experience with cloud technologies', ANALYZE),
    Example('analyze my understanding of machine learning algorithms', ANALYZE),
    Example('evaluate my case study analyses', ANALYZE),
    Example('analyze my experience with database management', ANALYZE),
    Example('evaluate my understanding of cybersecurity principles', ANALYZE),
    Example('analyze my design thinking exercises', ANALYZE),
    Example('evaluate my experience with front-end development', ANALYZE),
    Example('analyze my understanding of back-end development', ANALYZE),
    Example('evaluate my pair programming exercises', ANALYZE),
    Example('analyze my experience with DevOps practices', ANALYZE),
    Example('evaluate my understanding of artificial intelligence concepts', ANALYZE),
    Example('analyze my system design exercises', ANALYZE),
    Example('evaluate my experience with mobile app development', ANALYZE),
    Example('analyze my understanding of network protocols', ANALYZE),
    Example('evaluate my debugging exercises', ANALYZE),
    Example('analyze my experience with data visualization tools', ANALYZE),
    Example('evaluate my understanding of operating systems', ANALYZE),
    Example('analyze my whiteboard coding sessions', ANALYZE),
    Example('evaluate my experience with version control systems', ANALYZE),
    Example('analyze my understanding of computer architecture', ANALYZE),
    Example('evaluate my logic puzzle exercises', ANALYZE),
    Example('analyze my experience with API development', ANALYZE),
    Example('evaluate my understanding of software engineering principles', ANALYZE),
    Example('analyze my brainstorming sessions', ANALYZE),
    Example('evaluate my experience with project management tools', ANALYZE),
    Example('analyze my understanding of web development frameworks', ANALYZE),
    Example('evaluate my code review sessions', ANALYZE),
    Example('analyze my experience with user interface design', ANALYZE),
    Example('evaluate my understanding of user experience principles', ANALYZE),
    Example('analyze my technical presentations', ANALYZE),
    Example('evaluate my experience with hardware troubleshooting', ANALYZE),
    Example('analyze my understanding of software optimization techniques', ANALYZE),
    Example('evaluate my conflict resolution scenarios', ANALYZE),
    Example('analyze my experience with data mining techniques', ANALYZE),
    Example('evaluate my understanding of object-oriented programming', ANALYZE),
    Example('analyze my leadership scenarios', ANALYZE),
    Example('evaluate my experience with statistical analysis tools', ANALYZE),
    Example('analyze my understanding of algorithm design', ANALYZE),
    Example('evaluate my time management exercises', ANALYZE),
    Example('analyze my experience with quality assurance practices', ANALYZE),
    Example('evaluate my understanding of software documentation standards', ANALYZE),
    Example('analyze my negotiation scenarios', ANALYZE),
    Example('evaluate my experience with business intelligence tools', ANALYZE),
    Example('analyze my understanding of data modeling techniques', ANALYZE),
    Example('evaluate my customer service scenarios', ANALYZE),
]

def user_intent(message):
    intent = co.classify(
        model='large',
        inputs=[message],
        examples=EXAMPLES
    )

    return intent.classifications[0].predictions
