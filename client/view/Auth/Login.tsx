import { useAuth } from "@app/hooks";
import { LoginValidator } from "@app/validators";
import {
  VStack,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Divider,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { InferType } from "yup";

type FormType = InferType<typeof LoginValidator>;

export const Login = () => {
  const methods = useForm<FormType>({
    resolver: yupResolver(LoginValidator),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  return (
    <VStack
      rowGap="8px"
      boxShadow="0px 0.1px 1px 1px rgba(103, 103, 103, 0.25)"
      padding="18px"
      borderRadius="8px"
    >
      <Heading fontFamily="Roboto" fontWeight="bold" fontSize="48px">
        Instant!!
      </Heading>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(async (profileDto) => {
            setIsLoading(true);
            try {
              await login({
                email: profileDto.email,
                password: profileDto.password,
              });
            } catch (error) {
            } finally {
              setIsLoading(false);
            }
          })}
        >
          <VStack>
            <FormControl isRequired label="Email" id="email">
              <FormLabel htmlFor="email" fontFamily="Roboto">
                Email
              </FormLabel>
              <Input
                disabled={isLoading}
                width="325px"
                type="email"
                id="email"
                fontFamily="Roboto"
                placeholder="hi@instant.com"
                {...register("email")}
              />
              <FormErrorMessage fontFamily="Roboto">
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired label="Password" id="password">
              <FormLabel htmlFor="password" fontFamily="Roboto">
                Password
              </FormLabel>
              <Input
                width="325px"
                type="password"
                disabled={isLoading}
                id="password"
                fontFamily="Roboto"
                placeholder="********"
                {...register("password")}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              background="rgb(0,149,246)"
              width="100%"
              textColor="white"
              disabled={isLoading}
              isLoading={isLoading}
              borderRadius="10px"
              fontFamily="Roboto"
              type="submit"
              _hover={{
                background: "rgb(24,119,242)",
              }}
            >
              Login
            </Button>
          </VStack>
        </form>
      </FormProvider>
      <Divider />
      <Text cursor="pointer" fontFamily="Roboto" textColor="#1c336a">
        Forget your password?{" "}
      </Text>
    </VStack>
  );
};
