export default function ListedEmails({...props}) {
    return (
        <li className="pb-4 mb-4 border-b-2 border-b-amber-50">
            <h3>Name: {props.name}</h3>
            <p>Id: {props.id}</p>
            <p>Phone: {props.phoneNumber}</p>
            <div className="flex">
                <p>Email:  <a href={`mailto:${props.emailAddress}`}>{props.emailAddress}</a></p>
            </div>
            <p>Message: {props.message}</p>
        </li>
    )
}