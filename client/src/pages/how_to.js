import { Container } from "react-bootstrap";

export const HowTo = () => {
    return(
      <div>
        <h1 className="my-5">How does it work?</h1>
        <div className="row my-5">
            <div className="col">
                <h2>
                    Writing Articles
                </h2>
                <p>
                    Authors can stake <strong>1000 tokens</strong> to publish an article onto the website.  
                    If the article is written with minimal factual errors, they will recieve those tokens back, 
                    and will instead start to gain tokens based off of different factors.  However, if the article is 
                    fact-checked more than an arbitrary amount of times, the tokens staked will then be forfeited.
                </p>
            </div>
            <div className="col">
                <h2>
                    Verifying Facts
                </h2>
                <p>
                    Community members can stake <strong>50 tokens</strong> to verify parts of an article onto the website.  
                    A Community member can either verify parts of the article, recieving <strong>15 additional tokens</strong>, or flag parts of the article,
                    receiving <strong>50 additional tokens</strong>.  However, if a verification is disputed, then the tokens staked by the 
                    author of the verification will lose the vested tokens.
                </p>
            </div>
            <div className="col">
                <h2>
                    Disputing Verifications
                </h2>
                <p>
                    Community members can also stake <strong>50 tokens</strong> to dispute a verification on an article.  
                    If the dispute wins, the disputer recieves <strong>50 additional tokens</strong>.  However, if a dispute fails,
                    the disputer will lose the vested tokens.  Disputes will be handled by a small group of trusted community members.
                </p>
            </div>
        </div>
        <h1 className="my-5"> Why Tokens?</h1>
        <div className="row my-5">
            <div className="col">
                <h2>
                    Incentives Truth
                </h2>
            </div>
            <div className="col">
                <h2>
                    Discourages Click
                </h2>
            </div>
        </div>
      </div>
    );
  }