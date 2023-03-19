import { useAuth } from "@app/hooks";
import { RegisterValidator } from "@app/validators";
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

type FormType = InferType<typeof RegisterValidator>;

export const Signup = ({ setView }: SignUpProps) => {
  const methods = useForm<FormType>({
    resolver: yupResolver(RegisterValidator),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

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
            console.log(profileDto);
            try {
              await signUp({
                email: profileDto.email,
                password: profileDto.password,
                name: profileDto.name,
                slug: profileDto.slug,
              });
              setView("login");
            } catch (error) {
              console.log(error);
            } finally {
              setIsLoading(false);
            }
          })}
        >
          <VStack>
            <FormControl isRequired label="Name" id="name">
              <FormLabel htmlFor="name" fontFamily="Roboto">
                Name
              </FormLabel>
              <Input
                disabled={isLoading}
                width="325px"
                type="name"
                id="name"
                fontFamily="Roboto"
                placeholder="John Doe"
                {...register("name")}
              />
              <FormErrorMessage fontFamily="Roboto">
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
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
            <FormControl isRequired label="Slug" id="slug">
              <FormLabel htmlFor="slug" fontFamily="Roboto">
                Slug
              </FormLabel>
              <Input
                disabled={isLoading}
                width="325px"
                type="text"
                id="slug"
                fontFamily="Roboto"
                placeholder="DarkPhoenix2704"
                {...register("slug")}
              />
              <FormErrorMessage fontFamily="Roboto">
                {errors.slug && errors.slug.message}
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
            <FormControl
              isRequired
              label="Confirm Password"
              id="confirmPassword"
            >
              <FormLabel htmlFor="confirmPassword" fontFamily="Roboto">
                Confirm Password
              </FormLabel>
              <Input
                width="325px"
                type="password"
                disabled={isLoading}
                id="confirmPassword"
                fontFamily="Roboto"
                placeholder="********"
                {...register("confirmPassword")}
              />
              <FormErrorMessage>
                {errors.confirmPassword && errors.confirmPassword.message}
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
              Signup
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

interface SignUpProps {
  setView: Dispatch<SetStateAction<"login" | "signup">>;
}
