import React from 'react';
import { Tile, Button } from 'carbon-components-react';

const Deduction = () => {

    return (
        <div className='cds--grid cds--grid--full-width deduction'>
            <div className='cds--row' >
                <div className='cds--col-lg-9' >
                    <div className='cds--row name'>
                        <div className='cds--col-lg-16'>
                            <h1>Welcome, suppakorn rakna</h1>
                        </div>
                    </div>
                    <div className='cds--row menu'>
                        <div className='cds--col-lg-4'>
                            <div className='composer'>
                                <img src='https://quantum-computing.ibm.com/_nuxt/img/composer-light.6799b22.svg' />
                                <div className='middle'>
                                    <div className='intro'>Graphically build circuits with</div>
                                    <div className='title'>IBM Quantum Composer</div>
                                </div>
                                <Button className='button'>Launch Composer</Button>
                            </div>
                        </div>
                        <div className='cds--col-lg-4'>
                            <Tile style={{ backgroundColor: 'green' }} />
                        </div>
                        <div className='cds--col-lg-4'>
                            <Tile style={{ backgroundColor: 'blue' }} />
                        </div>
                        <div className='cds--col-lg-4'>
                            <Tile style={{ backgroundColor: 'yellow' }} />
                        </div>
                    </div>
                    <div className='cds--row'>
                        <div className='cds--col-lg-8'>
                            <div className='cds--row'>
                                <div className='cds--col-lg-16'>
                                    <Tile style={{ backgroundColor: 'orange' }} />
                                </div>
                            </div>
                            <div className='cds--row'>
                                <div className='cds--col-lg-16'>
                                    <Tile style={{ backgroundColor: 'violet' }} />
                                </div>
                            </div>
                        </div>
                        <div className='cds--col-lg-8'>
                            <Tile style={{ backgroundColor: 'pink' }} />
                        </div>
                    </div>
                </div>
                <div class="cds--col-lg-7" >
                    <div className='cds--offset-lg-9 cds--col-lg-9 cds--offset-md-4 cds--col-md-4'>
                        <Tile style={{ height: '90vh', backgroundColor: 'green' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Deduction;