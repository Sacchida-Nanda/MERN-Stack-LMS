import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill, RiUserFill } from 'react-icons/ri';

function Header() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const isAuthenticated = true;
    
    const user = {
        role: 'admin'
    };

    const routes = [
        {
            title: 'Home',
            url: '/'
        },
        {
            title: 'All Courses',
            url: '/courses'
        },
        {
            title: 'Request a Course',
            url: '/request'
        },
        {
            title: 'Contact Us',
            url: '/contact'
        }
    ];

    const logoutHandler = () => {
        console.log('*** Logout ***');
    }

    return (
        <>
            <ColorModeSwitcher />

            <Button
                onClick={onOpen}
                colorScheme={'yellow'}
                width={'12'} height={'12'}
                rounded={'full'}
                position={'fixed'}
                top={'6'}
                left={'6'}
            >   
                <RiMenu5Fill />
            </Button>

            <Drawer placement='left' onClose={onClose }  isOpen={isOpen}>
                <DrawerOverlay backdropFilter={'blur(2px)'}/>
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={'1px'}>COURSE BUNDLER</DrawerHeader>

                    <DrawerBody>
                        <VStack spacing={'4'} alignItems={'flex-start'}>
                            {
                                routes.map((route, key) => 
                                    <Link to={route.url} key={key}>
                                        <Button variant={'ghost'} key={key}>{route.title}</Button>
                                    </Link>
                                )
                            }
                        </VStack>

                        <HStack
                            justifyContent={'space-evenly'}
                            position={'absolute'}
                            bottom={'2rem'}
                            width={'80%'}
                        >
                            {
                                isAuthenticated ? 
                                <>
                                    <VStack>
                                        <HStack>
                                            <Link to='/profile'>
                                                <Button variant={'ghost'} colorScheme={'yellow'}>
                                                    <RiUserFill />
                                                    Profile
                                                </Button>
                                            </Link>

                                            <Button variant={'ghost'} onClick={logoutHandler}>
                                                <RiLogoutBoxLine />
                                                Logout
                                            </Button>
                                        </HStack>

                                        {
                                            user && user.role === 'admin' && <Link to='/admin/dashboard'>
                                                <Button variant={'ghost'} colorScheme={'purple'}>
                                                    <RiDashboardFill />
                                                    Dashboard
                                                </Button>
                                            </Link>
                                        }
                                    </VStack>
                                </>
                                :
                                <>
                                    <Link to='/login'>
                                        <Button colorScheme={'yellow'}>Login</Button>
                                    </Link>

                                    <p>or</p>

                                    <Link to='/register'>
                                        <Button colorScheme={'yellow'}>Sign Up</Button>
                                    </Link>
                                </>
                            }
                        </HStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Header;