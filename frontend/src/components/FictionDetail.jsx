import React, { useState, useEffect } from 'react'
import axios from 'axios';
// import Slider from './Slider';
import BookNav from './BookNavbar';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const FictionDetail = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get(`https://manushi1224.pythonanywhere.com/api/fiction-books/`)
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, []);

    return (
        <div>
            <BookNav />
            {/* <Slider data={books} /> */}
            <div>
                <div className="row">
                    {books.map((book) => {
                        return (

                            <div className="col-2 col-md-3 col-sm-4 col-xs-5 col-lg-2">
                                    <Card className='swiper-bed'>
                                <Link to={`/${book.google_id}`} className="text-decoration-none text-reset">
                                        <Card.Body>
                                            <div className="d-flex justify-content-center Card-Body">
                                                <img src={book.thumbnail} alt="" className="card-image" />
                                            </div>
                                            <div className="text-center mt-1">
                                                <strong>{book.title.length > 20 ?
                                                    <span>{book.title.substring(0, 25)}...</span>
                                                    : (
                                                        <span>{book.title}</span>)}</strong>
                                            </div>
                                            <div className="text-center text-secondary">
                                                {book.authors.substring(0, 25)}
                                            </div>
                                            <div className="text-center price">
                                                {book.retail_price_amount !== 0 ? (
                                                    <div>
                                                        ₹ <span>{book.retail_price_amount}</span>
                                                    </div>
                                                ) :
                                                    <div>Free</div>}
                                            </div>
                                            <div className="sci ms-2">
                                                <div className="scidetail ms-3">
                                                    {/* <button className="btn btn-light scibutton" onClick={() => handleModal(book)}>Quick View</button> */}
                                                </div>
                                            </div>
                                        </Card.Body>
                                </Link>
                                    </Card>
                            </div>

                        )
                    })}
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </div>
    )
}

export default FictionDetail