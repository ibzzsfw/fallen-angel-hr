import React from 'react';
import { Tile, Button } from 'carbon-components-react';

const Deduction = () => {

    return (
            <div className='cds--grid cds--grid--full-width deduction'>
                <div className='cds--row cds--no--gutter center'>
                    <div className='cds--col-max-10 cds--col-xlg-16' >
                        <div className='cds--row name'>
                            <div className='cds--col-lg-16'>
                                <h1>Welcome, suppakorn rakna</h1>
                            </div>
                        </div>
                        <div className='cds--row menu'>
                            <div className='cds--col'>
                                <div className='composer'>
                                    <img alt='composer logo' src='https://quantum-computing.ibm.com/_nuxt/img/composer-light.6799b22.svg' />
                                    <div className='middle'>
                                        <div className='intro'>Graphically build circuits with</div>
                                        <div className='title'>IBM Quantum Composer</div>
                                    </div>
                                    <Button className='button'>Launch Composer</Button>
                                </div>
                            </div>
                            <div className='cds--col'>
                                <Tile  />
                            </div>
                            <div className='cds--col'>
                                <Tile style={{ backgroundColor: 'blue' }} />
                            </div>
                            <div className='cds--col'>
                                <Tile style={{ backgroundColor: 'yellow' }} />
                            </div>
                        </div>
                        <div className='cds--row tiles'>
                            <div className='cds--col left'>
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
                            <div className='cds--col right'>
                                <Tile style={{ backgroundColor: 'pink', height: '100%' }} />
                            </div>
                        </div>
                    </div>
                    <div className="cds--col-max-6 ds--col-xlg-16" >
                        <Tile style={{ height: '90vh', backgroundColor: 'green' }} />
                    </div>
                </div>
            </div>
    )
}

export default Deduction;