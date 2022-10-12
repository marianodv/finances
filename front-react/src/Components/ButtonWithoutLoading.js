import Button from 'react-bootstrap/Button'
import Figure from 'react-bootstrap/Figure'

const variants={
    create:"outline-primary",
    edit:"outline-secondary",
    delete:"outline-danger",
    view:"outline-success",
    info:"outline-info"
}

function ButtonWithoutLoading(props){

    const {loading,variant,type,children,onClick,image} = props

    console.log(image)

    return(
        <Button type = {type || 'button'} variant={variants[variant]} disabled={loading || false} onClick={onClick || null}>
            {(image === 'movements') &&
                <Figure>
                    <Figure.Image
                        width={80}
                        height={60}
                        src={require('../Images/movements.png')}
                    />
                    <Figure.Caption>
                        {children}
                    </Figure.Caption>
                </Figure>
            }
            {(image === 'categories') &&
                <Figure>
                    <Figure.Image
                        width={80}
                        height={60}
                        src={require('../Images/categories.png')}
                    />
                    <Figure.Caption>
                        {children}
                    </Figure.Caption>
                </Figure>
            }
            {!image &&
                children
            }
        </Button>
    )


    /*{(image === 'movements') &&
                
            }
    {(image === 'categories') &&
               <Figure>
                <Figure.Image
                    width={120}
                    height={120}
                    src="%PUBLIC_URL%/categories.png"
                />
                <Figure.Caption>
                    {children}
                </Figure.Caption>
            </Figure>
            }
            {!image &&
                {children}
            }*/
}


export default ButtonWithoutLoading