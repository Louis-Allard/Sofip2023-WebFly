import "../Message/message.css"

function Message(props:any) {
    return (
      
      <div className="componentMessage">
        <div className="photoMessageMaker">
          {props.avatar}
        </div>
        <div className="textM">
            <span className="textMessage">{props.contenu}</span>
        </div>
        <div className="dateM">
            <span className="dateMessage">{props.created_at}</span>
        </div>
      </div>
    );
  }

export default Message;
