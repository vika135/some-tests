import "./Card.css";

export default function Card(props: Record<string, any>) {
    return (
        <div className="card">
            <div>{props.card.title}</div>
            <div>{props.card.description}</div>
        </div>
    )
}