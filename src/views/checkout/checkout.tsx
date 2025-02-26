import { useState, useEffect, useImperativeHandle, forwardRef, useRef } from "react";
import PageBase from "../../components/page/page-base/pageBase";
import { useTypesSeletor } from "../../hooks/typedSelector";
import CustomSideOptions from "./components/sideOptions";
import "./checkout.sass"
import { useForm, ValidationRule } from "react-hook-form";
import Button from "../../components/button/button";
import CheckoutRadio from "./components/formRadio";
import TextField from "../../components/inputs/textField/textxField";
import { getPartialCard } from "../../helpers/general";
import { useDispatch } from "react-redux";
import { actions } from "../../store/reducers";
import { useNavigate } from "react-router-dom";

type Props = {

};

type formValuesType = {
    endereco: endereco
    cardInformation: cardInformation
    newCard: cardInformation | undefined
    newAddress: endereco | undefined
}

export type cardInformation = {
    number: string
    expiration: string
    security: string
}

export type endereco = {
    street: string
    state: string
    city: string
    number: string
}

const Checkout = ({ }: Props) => {
    // const [triggerForm, setTriggerForm] = useState(false)
    const formRef = useRef<{ submitForm: () => any }>(null);
    // useEffect(() => {
    //     console.log('12345')
    //     triggerForm
    //     && formRef.current
    //     && formRef.current?.submitForm()
    //     // setTriggerForm(false)
    // }, [triggerForm]);

    const triggerForm = () => {
        formRef.current && formRef.current?.submitForm()

    }

    const SingleElement = forwardRef<{ submitForm: () => void }, any>(({}, ref) => {
        const navigate = useNavigate()
        const [skip, setSkip] = useState(true);
        const selectorUser = useTypesSeletor(v => v.user)
        // const selectorOrder = useTypesSeletor(v => v.order)
        const dispatch = useDispatch()
        // const [products, setProducts] = useState<IProdutoCart[]>([])
        // const cartItems = useTypesSeletor((state) => state.checkout.items);
        const { setError, watch, getValues, unregister, register, handleSubmit, formState, trigger, clearErrors } = useForm<formValuesType>();
        const [defaultLocation, setDefaultlocation] = useState<{ defaultLocation: boolean, newLocation: endereco | undefined }>({
            defaultLocation: true, newLocation: undefined
        })
        const [defaultCard, setDefaultCard] = useState<{ defaultCard: boolean, newCard: cardInformation | undefined }>({
            defaultCard: true, newCard: undefined
        })

        useImperativeHandle(ref, () => ({
            submitForm() {
                handleSubmit(onSubmit)();
            }
        }));

        // useEffect(() => {
        // console.log(triggerForm, 'trkdnlkjenckjeb')
        // triggerForm && handleSubmit(onSubmit)()
        // }, [triggerForm]);

        const onSubmit = async () => {
            if (!defaultCard.defaultCard && !defaultCard.newCard) {
                setError("newCard", { type: "manual", message: "new card must be set!" });
                return;
            }
            if (!defaultLocation.defaultLocation && !defaultLocation.newLocation) {
                setError("newAddress", { type: "manual", message: "New address must be set!" });
                return;
            }
            alert("Order Placed Successfully");
            navigate("/home")

        };

        watch(({ endereco, cardInformation }) => {
            for (let key in endereco) {
                const enderecoKey = key as keyof typeof endereco;
                endereco[enderecoKey] && clearErrors(`endereco.${enderecoKey}`)
            }
            for (let key in cardInformation) {
                const enderecoKey = key as keyof typeof cardInformation;
                cardInformation[enderecoKey] && clearErrors(`cardInformation.${enderecoKey}`)
            }
        })

        // useEffect(() => {
        //     setProducts(cartItems)
        // }, [cartItems]);

        const changeLoading = () => {
            dispatch(actions.order.setLoading(true))
            setTimeout(() => {
                dispatch(actions.order.setLoading(false))
            }, 1000);
        }

        useEffect(() => {
            if (skip) {
                setSkip(false)
                return
            }
            if (defaultLocation.defaultLocation) {
                unregister(["endereco", "newAddress"])
                clearErrors("endereco")
                dispatch(actions.order.setDelivery(selectorUser.user?.endereco))
            } else if (defaultLocation.newLocation) {
                register('endereco.street', { value: 'bill' })
                dispatch(actions.order.setDelivery(defaultLocation.newLocation))
            }
            if (defaultCard.defaultCard) {
                unregister(["cardInformation", "newCard"])
                clearErrors("endereco")
                dispatch(actions.order.setPayment(selectorUser.user?.cardInformation[0]))
            } else if (defaultCard.newCard) {
                dispatch(actions.order.setPayment(defaultCard.newCard))
            }
        }, [defaultLocation, defaultCard]);

        const validation = (): { address: ValidationRule<boolean>, cardInformation: ValidationRule<boolean> } => {
            return {
                address: {
                    value: !defaultLocation.defaultLocation && !defaultLocation.newLocation,
                    message: "required"
                },
                cardInformation: {
                    value: !defaultCard.defaultCard && !defaultCard.newCard,
                    message: "required"
                }
            }
        }

        const paymentUpdate = async () => {
            const valid = await trigger("cardInformation")
            const copy = Object.assign({}, getValues("cardInformation"))
            if (valid && !formState.errors.cardInformation) {
                setDefaultCard({ defaultCard: false, newCard: copy })
                dispatch(actions.order.setPayment(copy))
                clearErrors("newCard")
                changeLoading()
            }
        }

        const addressUpdate = async () => {
            const valid = await trigger("endereco")
            const copy = Object.assign({}, getValues("endereco"))
            if (valid && !formState.errors.endereco) {
                changeLoading()
                setDefaultlocation({ defaultLocation: false, newLocation: copy })
                dispatch(actions.order.setDelivery(copy))
                clearErrors("newAddress")
            }
        }

        const checkoutLocationClickHandler = (deLocation: boolean) => {
            if (defaultLocation.newLocation) changeLoading()
            setDefaultlocation(prev => { return { ...prev, defaultLocation: deLocation } })
        }

        const checkoutPaymentClickHandler = (dePayment: boolean) => {
            if (defaultCard.newCard) changeLoading()
            setDefaultCard(prev => { return { ...prev, defaultCard: dePayment } })
        }

        return (
            <div className="checkout-wrapper">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Delivery method</h5>
                    <div className="group">
                        <CheckoutRadio style={{ width: "47%" }} clickEmitter={() => checkoutLocationClickHandler(true)} checked={defaultLocation.defaultLocation} iconsClass="mi-location-home" title="Defaut Adrress" subTitle={selectorUser.user?.endereco.street} />
                        <CheckoutRadio style={{ width: "47%" }} clickEmitter={() => checkoutLocationClickHandler(false)} checked={!defaultLocation.defaultLocation} iconsClass="mi-location" title="New Adrress" subTitle={defaultLocation.newLocation && defaultLocation.newLocation.street} />
                    </div>
                    {!defaultLocation.defaultLocation &&
                        <>
                            <span className="subtitle">Delivery Address</span>
                            <div className="group">
                                <TextField value={defaultLocation.newLocation?.street} error={formState.errors.endereco?.street} {...register("endereco.street", { required: validation().address })} colorType="dimgrey" style={{ width: "60%" }} title="Street" />
                                <TextField value={defaultLocation.newLocation?.state} error={formState.errors.endereco?.state} {...register("endereco.state", { required: validation().address })} colorType="dimgrey" style={{ width: "30%" }} title="State" />
                                <TextField value={defaultLocation.newLocation?.city} error={formState.errors.endereco?.city} {...register("endereco.city", { required: validation().address })} colorType="dimgrey" style={{ width: "30%" }} title="City" />
                                <TextField value={defaultLocation.newLocation?.number} inputType="number" error={formState.errors.endereco?.number} {...register("endereco.number")} colorType="dimgrey" style={{ width: "20%" }} title="Number" />
                            </div>
                            <div className="action">
                                <Button classes={`${formState.errors.newAddress ? "error" : ""}`} buttonType="button" clickEmitter={() => addressUpdate()} label="Update Address" type="3"></Button>
                            </div>
                        </>
                    }
                    <h5>Payment method</h5>
                    <div className="group">
                        <CheckoutRadio style={{ width: "47%" }} clickEmitter={() => checkoutPaymentClickHandler(true)} checked={defaultCard.defaultCard} iconsClass="i-credit-card" title="Defaut Card" subTitle={getPartialCard(selectorUser.user?.cardInformation[0].number)} />
                        <CheckoutRadio style={{ width: "47%" }} clickEmitter={() => checkoutPaymentClickHandler(false)} checked={!defaultCard.defaultCard} iconsClass="i-simbolo-dinheiro" title="New Payment Option" subTitle={getPartialCard(defaultCard.newCard?.number)} />
                    </div>
                    {!defaultCard.defaultCard &&
                        <>
                            <span className="subtitle">Card Information</span>
                            <div className="group">
                                <TextField value={defaultCard.newCard?.number} error={formState.errors.cardInformation?.number} {...register("cardInformation.number", { required: validation().cardInformation })} colorType="dimgrey" style={{ width: "60%" }} title="Number" />
                                <TextField value={defaultCard.newCard?.security} error={formState.errors.cardInformation?.security} {...register("cardInformation.security", { required: validation().cardInformation })} colorType="dimgrey" style={{ width: "30%" }} title="Security Code" />
                                <TextField value={defaultCard.newCard?.expiration} error={formState.errors.cardInformation?.expiration} {...register("cardInformation.expiration", { required: validation().cardInformation })} colorType="dimgrey" style={{ width: "30%" }} title="Expiration Date" />
                            </div>
                            <div className="action">
                                <Button classes={`${formState.errors.newCard ? "error" : ""}`} buttonType="button" clickEmitter={() => paymentUpdate()} label="Update Payment" type="3"></Button>
                            </div>
                        </>
                    }
                    {/* <div className="last-action">
                        <Button classes="full" style={{ marginTop: "25px" }} buttonType="submit" label="Place Order" type="2"></Button>
                    </div> */}
                </form>
            </div>

        )
    })

    return (
        <PageBase CustomSideOptions={<CustomSideOptions actionEmitter={() => triggerForm()} />} SingleElement={<SingleElement ref={formRef} triggerForm={triggerForm} />} />
    )
};

export default Checkout;